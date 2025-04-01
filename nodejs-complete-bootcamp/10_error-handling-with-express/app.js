const express = require('express');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const catchAsyncError = require('./utils/catchAsyncError');

// Uncaught Exception
global.process.on('uncaughtException', (err) => {
  console.log(err.name, err.message);
  console.log('Uncaught Exception! Shutting down...');
  global.process.exit(1);
});

const app = express();

const someFunction = new Promise((resolve, reject) => {
  // Change this to false to simulate a rejection
  const success = true;

  if (success) {
    resolve('Promise resolved successfully!');
  } else {
    reject('Promise rejected!');
  }
});

app.get('/', (req, res) => {
  res.send('Hello from the server');
});

// Approach 01: Handling error using try-catch
// app.get('/example', async (req, res) => {
//   try {
//     const data = await someFunction();
//     res.status(200).json({
//       status: 'success',
//       data: {
//         data,
//       },
//     });
//   } catch (err) {
//     res.status(404).json({
//       status: 'fail',
//       message: err,
//     });
//   }
// });

// Approach 02: Handling error using catchAsyncError function
// This catchAsyncError function can be added in router directly.
app.get(
  '/example',
  catchAsyncError(async (req, res) => {
    const data = await someFunction();
    res.status(200).json({
      status: 'success',
      data: {
        data,
      },
    });
  }),
);

// Add a middleware here to handle other routes
app.all('*', (req, res, next) => {
  // Approach 01:
  // res.status(404).json({
  //   status: 'fail',
  //   message: `Can't find ${req.originalUrl} on this server!`,
  // });

  // Approach 02:
  // const err = new Error(`Can't find ${req.originalUrl} on this server!`);
  // err.status = 'fail';
  // err.statusCode = 404;

  // next(err);

  // Approach 03:
  const err = new AppError(
    `Can't find ${req.originalUrl} on this server!`,
    404,
  );
  next(err);
});

// Error handling middleware
app.use(globalErrorHandler);

const PORT = global.process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`The server is listening on port ${PORT}...`);
});

// Unhandled Rejection
global.process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log('Unhandled Rejection! Shutting down...');
  server.close(() => {
    global.process.exit(1);
  });
});
