const express = require('express');

const app = express();

// Get request
app.get('/', (req, res) => {
  // res.send('Hello from the server side...');

  // Sending with status code
  // res.status(200).send('Hello from the server side...');

  // Sending the JSON
  res
    .status(200)
    .json({ message: 'Hello from the server side', app: 'Natours' });
});

// Post request
app.post('/', (req, res) => {
  res.send('You can post to this endpoint...');
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`The server is listening on port ${PORT}.`);
});
