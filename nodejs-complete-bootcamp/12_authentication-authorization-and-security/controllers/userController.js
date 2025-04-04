const User = require('../models/userModel');
const AppError = require('../utils/AppError');
const catchAsyncError = require('../utils/catchAsyncError');

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};

  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) {
      newObj[el] = obj[el];
    }
  });

  return newObj;
};

exports.getAllUsers = catchAsyncError(async (req, res) => {
  const users = await User.find();

  res.status(200).json({
    status: 'success',
    data: {
      users,
    },
  });
});

exports.updateMe = catchAsyncError(async (req, res, next) => {
  // 1) Create error if user POSTs password data
  const { password, confirmPassword } = req.body;
  if (password || confirmPassword) {
    return next(
      new AppError(
        'This route is not for password updates. Please use /update-password route',
        400,
      ),
    );
  }

  // 2) Filter out unwanted fields that are not allowed to be updated
  // Filter out the user property and make sure that only name and email
  // should be allowed to update. User role and other password
  // related fields must not be allowed to update.
  const filteredBody = filterObj(req.body, 'name', 'email');

  // 3) Update user document
  // Using findByIdAndUpdate instead of findById to prevent running the model validation
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
});

exports.deleteMe = catchAsyncError(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.getUser = (req, res) => {
  res
    .status(500)
    .json({ status: 'error', message: 'This route is not yet defined!' });
};

exports.createUser = (req, res) => {
  res
    .status(500)
    .json({ status: 'error', message: 'This route is not yet defined!' });
};

exports.updateUser = (req, res) => {
  res
    .status(500)
    .json({ status: 'error', message: 'This route is not yet defined!' });
};

exports.deleteUser = (req, res) => {
  res
    .status(500)
    .json({ status: 'error', message: 'This route is not yet defined!' });
};
