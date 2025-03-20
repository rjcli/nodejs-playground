const fs = require('fs');
const superagent = require('superagent');

const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, 'utf-8', (err, data) => {
      if (err) reject('File not found');
      resolve(data);
    });
  });
};

const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, 'utf-8', (err) => {
      if (err) reject('Could not write file.');
      resolve('Successful');
    });
  });
};

readFilePro('./dog.txt')
  .then((data) => {
    console.log(`Breed: ${data}`);
    return superagent.get(
      `https://dog.ceo/api/breed/${data.trim()}/images/random`,
    );
  })
  .then((res) => {
    console.log(res.body.message);
    return writeFilePro('./dog-img.txt', res.body.message);
  })
  .then(() => {
    console.log('Random dog image saved to the file!');
  })
  .catch((err) => {
    console.log(err.message);
  });

module.exports = { readFilePro, writeFilePro };
