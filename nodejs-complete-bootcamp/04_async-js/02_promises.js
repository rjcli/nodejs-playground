const { readFilePro } = require('./03_callback-hell-to-promises');

readFilePro('./dog.txt')
  .then((data) => {
    console.log(data);
  })
  .catch((err) => console.log(err));
