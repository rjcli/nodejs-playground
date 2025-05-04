const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const cors = require('cors');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const { webhooksCheckout } = require('./controllers/bookingController');

dotenv.config({ path: './config.env' });

const tourRouter = require('./routes/tourRoute');
const userRouter = require('./routes/userRoute');
const reviewRouter = require('./routes/reviewRoute');
const bookingRouter = require('./routes/bookingRoute');
const viewRouter = require('./routes/viewRoute');

const app = express();

// Trust proxies
app.enable('trust proxy');

// View engine
app.set('view engine', 'pug');
app.set('views', './views');

// GLOBAL MIDDLEWARES
app.use(helmet());

// Cors
// Allowed only to api.natours.com, natours.com
// app.use(
//   cors({
//     origin: 'https://www.natours.com',
//   }),
// );

// This set Access-Control-Allow-Origin *
app.use(cors());

// Complex requests
app.options('*', cors());
// app.options('/api/v1/tours/:id', cors());

// Write this before body parser
app.post(
  '/webhook-checkout',
  express.raw({ type: 'application/json' }),
  webhooksCheckout,
);

app.use(express.json({ limit: '10kb' }));

// Body parser
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

app.use(mongoSanitize());

app.use(xss());

app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsQuantity',
      'ratingsAverage',
      'maxGroupSize',
      'difficulty',
      'price',
    ],
  }),
);

// For deployment
app.use(compression());

app.use(express.static('./public'));

if (global.process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, Please try again in an hour!',
});
app.use('/api', limiter);

// Routes
app.use('/', viewRouter);
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/bookings', bookingRouter);

// Add a middleware here to handle other routes
app.all('*', (req, res, next) => {
  const err = new AppError(
    `Can't find ${req.originalUrl} on this server!`,
    404,
  );
  next(err);
});

// Error handling middleware
app.use(globalErrorHandler);

module.exports = app;
