const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

dotenv.config({ path: './config.env' });

const userRouter = require('./routes/userRoute');

const app = express();

// GLOBAL MIDDLEWARS

// Set security HTTP headers
app.use(helmet());

// Body parser: Reading data from body into req.body
app.use(express.json({ limit: '10kb' }));

// Data sanitization against NoSQL query injection
// This removes the $ and other symbols from the input which is used in MongoDB queries.
app.use(mongoSanitize());

// Data sanitization against cross side scripting (XSS)
// Removes malicious HTML codes by converting them to HTML entities
app.use(xss());

// Prevents parameter pollution
// Whitelist allows the parameter pollution for the provided fields
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

// Serving static files
app.use(express.static('./public'));

// Test middleware
app.use((req, res, next) => {
  console.log(req.headers);
  next();
});

// Logs the API requests
if (global.process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Rate limiter: Limit requests from the same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, Please try again in an hour!',
});
app.use('/api', limiter);

// Routes
app.use('/api/v1/users', userRouter);

const PORT = global.process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`The server is listening on ${PORT}...`);
});
