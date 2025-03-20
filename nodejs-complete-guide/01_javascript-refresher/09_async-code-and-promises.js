// Asynchronous code

const fetchData = (callback) => {
  setTimeout(() => {
    callback('Done with fetchData function!');
  }, 1500);
};
setTimeout(() => {
  console.log('Timer is done after 2 seconds');
  fetchData((text) => {
    console.log(text);
  });
}, 2000);

const fetchDataWithPromise = (value) => {
  const promise = new Promise((resolve, reject) => {
    if (value < 10) {
      setTimeout(() => {
        resolve('Done with fetchDataWithPromise function!');
      }, 1500);
    } else {
      reject('Rejected');
    }
  });
  return promise;
};

setTimeout(() => {
  console.log('Timer is done after 2 seconds');
  fetchDataWithPromise(5)
    .then((text1) => {
      console.log(text1);
      return fetchDataWithPromise(10);
    })
    .then((text2) => console.log(text2));
}, 2000);

// Synchronous code
console.log('Hello');
console.log('Hi');
