const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { promisify } = require('util');

const User = require('../models/userModel');
const catchAsyncError = require('../utils/catchAsyncError');
const AppError = require('../utils/AppError');
const sendEmail = require('../utils/email');

const createJwtToken = (id) => {
  return jwt.sign({ id }, global.process.env.JWT_SECRET, {
    expiresIn: global.process.env.JWT_EXPIRES_IN,
  });
};

const createAndSendToken = (user, statusCode, res) => {
  const token = createJwtToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() +
        global.process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000,
    ),
    httpOnly: true,
  };

  if (global.process.NODE_ENV === 'production') {
    cookieOptions.secure = true;
  }

  // Sending JWT token via cookies
  res.cookie('jwt', token, cookieOptions);

  // Making sure that password is not visible when the user is created
  // successfully and sent back as response
  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

exports.signup = catchAsyncError(async (req, res, next) => {
  // This line has vulnerability in creating the user because it is
  // accepting all the parts that user is sending to create the user.

  // const newUser = await User.create(req.body);

  // Fix for the above line: Pick only those fields which are necessary.
  // const newUser = await User.create({
  //   name: req.body.name,
  //   email: req.body.email,
  //   password: req.body.password,
  //   confirmPassword: req.body.confirmPassword,
  // });

  // Here, object destructing can also be used.
  const { name, email, password, confirmPassword, passwordChangedAt } =
    req.body;
  const newUser = await User.create({
    name,
    email,
    password,
    confirmPassword,
    passwordChangedAt,
  });

  createAndSendToken(newUser, 201, res);
});

exports.login = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  // 1) Check if email and password exists
  if (!email || !password) {
    return next(new AppError('Please provide email and password', 400));
  }

  // 2) Check if the user exists and password is correct
  // Selecting the password explicitly by using select('+password') function
  const user = await User.findOne({ email }).select('+password');

  // Don't check for user and password separately.
  // Check for user and password together to make sure that potential attacker
  // doesn't understand whether the email or, the password is incorrect.
  // The error message should be vague.
  if (!user || !(await user.isCorrectPassword(password, user.password))) {
    return next(new AppError('Incorrect email or, password', 401));
  }

  // 3) If everything is OK, send token to client
  createAndSendToken(user, 200, res);
});

exports.protect = catchAsyncError(async (req, res, next) => {
  let token;

  // 1) Getting JWT token and check it exists or not
  const headerToken = req.headers.authorization;
  if (headerToken && headerToken.startsWith('Bearer')) {
    token = headerToken.split(' ')[1];
  }

  if (!token) {
    return next(new AppError('You are not logged in', 401));
  }

  // 2) Verification token
  const decoded = await promisify(jwt.verify)(
    token,
    global.process.env.JWT_SECRET,
  );

  // 3) Check if the user still exists
  const freshUser = await User.findById(decoded.id);
  console.log(freshUser);
  if (!freshUser) {
    return next(
      new AppError(
        'The user belonging to this token does no longer exist!',
        401,
      ),
    );
  }

  // 4) Check if user changed password after the JWT was issued
  if (freshUser.isPasswordChangedAfter(decoded.iat)) {
    return next(
      new AppError('User recently changed password! Please log in again.', 401),
    );
  }

  // Grant access to the protected route
  req.user = freshUser;

  next();
});

// Middleware with arguments
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You do not have permission to perform this action', 401),
      );
    }

    next();
  };
};

exports.forgotPassword = catchAsyncError(async (req, res, next) => {
  // 1) Get user based on POSTed email
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return next(new AppError('No user found with this email!', 404));
  }

  // 2) Generate the random reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  // 3) Send it to user's email
  const resetURL = `${req.protocol}://${req.get('host')}/api/v1/users/reset-password/${resetToken}`;
  const message = `Forgot your password? Submit a PATCH request with your new password and confirmPassword to: ${resetURL}.\nIf yo didn't forget your password, please ignore this email!`;

  console.log(resetURL, message);

  // Here, try-catch block is needed because if some error occurs when sending the email then
  // we have to set back the password reset token and password reset expires.
  try {
    await sendEmail({
      email: user.email,
      subject: 'Your password reset token (valid for 10 minutes)',
      message,
    });

    res.status(200).json({
      status: 'success',
      message: 'Token sent to email!',
    });
  } catch {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(
      new AppError(
        'There was an error in sending the email. Please try again later!',
        500,
      ),
    );
  }
});

exports.resetPassword = catchAsyncError(async (req, res, next) => {
  // 1) Get user based on the token
  const hashedToken = crypto
    .createHash('sh1256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  // 2) If token has not expired, and there is user, set the new password
  if (!user) {
    return next(new AppError('Token is invalid or has expired', 400));
  }

  // If user is found and token is not expired then set the password.
  user.password = req.body.password;
  user.confirmPassword = req.body.confirmPassword;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  // 3) Update changedPasswordAt property for the user

  // 4) Log the user in, send JWT
  createAndSendToken(user, 200, res);
});

// For authenticated users, there should be update password feature
// without using forgetting password
exports.updatePassword = catchAsyncError(async (req, res, next) => {
  // 1) Get user from collection
  const user = await user.findById(req.user.id).select('+password');

  // Object Destr
  const { currentPassword, password, confirmPassword } = req.body;

  // 2) Check if the POSTed current password is correct
  if (!(await user.isCorrectPassword(currentPassword, user.password))) {
    return next(new AppError('Your current password is wrong', 401));
  }

  // 3) If so, update the password
  user.password = password;
  user.confirmPassword = confirmPassword;
  await user.save();

  // 4) Log user in, send JWT
  createAndSendToken(user, 200, res);
});
