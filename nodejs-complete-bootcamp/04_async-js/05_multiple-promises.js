const superagent = require('superagent');

const { readFilePro, writeFilePro } = require('./03_callback-hell-to-promises');

const getDogPic = async () => {
  try {
    const data = await readFilePro('./dog.txt');
    console.log(`Breed: ${data}`);

    const res1Pro = await superagent.get(
      `https://dog.ceo/api/breed/${data.trim()}/images/random`,
    );

    const res2Pro = await superagent.get(
      `https://dog.ceo/api/breed/${data.trim()}/images/random`,
    );

    const res3Pro = await superagent.get(
      `https://dog.ceo/api/breed/${data.trim()}/images/random`,
    );
    const allDogImages = await Promise.all([res1Pro, res2Pro, res3Pro]);
    console.log(allDogImages);

    const imgs = allDogImages.map((el) => el.body.message);
    console.log(imgs);

    await writeFilePro('./dog-img.txt', imgs.join('\n'));
    console.log('Random dog image saved to the file!');
  } catch (err) {
    console.log(err);
    // Throwing an error to mark this Promise as rejected
    throw err;
  }
  // Return this as Promise
  return '2. READY';
};

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
