const dotenv = require('dotenv');

const app = require('./app');

dotenv.config({ path: './config.env' });

const PORT = global.process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`The server is listening on port ${PORT}.`);
});
