const express = require('express');

const app = express();

const router = express.Router();

router.param('id', (req, res, next, val) => {
  console.log(`Tour id is: ${val}`);
  next();
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`The server is listening on port ${PORT}.`);
});
