const superagent = require('superagent');

const { readFilePro, writeFilePro } = require('./03_callback-hell-to-promises');

const getDogPic = async () => {
  try {
    const data = await readFilePro('./dog.txt');
    console.log(`Breed: ${data}`);

    const res = await superagent.get(
      `https://dog.ceo/api/breed/${data.trim()}/images/random`,
    );
    console.log(res.body.message);

    await writeFilePro('./dog-img.txt', res.body.message);
    console.log('Random dog image saved to the file!');
  } catch (err) {
    console.log(err);
    // Throwing an error to mark this Promise as rejected
    throw err;
  }
  // Return this as Promise
  return '2. READY';
};

/*
 * Approach 01: Calling getDogPic()
console.log('1: Will get dog pics');
// const res = getDogPic();
// console.log(res);
getDogPic()
  .then((data) => {
    console.log(data);
    console.log('3: Done getting dog pics');
  })
  .catch((err) => {
    console.log(err);
  });
*/

// Approach 02: Calling getDogPic()
(async () => {
  try {
    console.log('1: Will get dog pics');
    const data = await getDogPic();
    console.log(data);
    console.log('3: Done getting dog pics');
  } catch (err) {
    console.log(err);
  }
})();
