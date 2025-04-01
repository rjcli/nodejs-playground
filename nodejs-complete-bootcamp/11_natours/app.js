const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
dotenv.config({ path: './config.env' });

const tourRouter = require('./routes/tourRoute');
const userRouter = require('./routes/userRoute');

const app = express();

// Middleware
app.use(express.json());
app.use(express.static('./public'));
if (global.process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Routes
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

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
