# Asynchronous JavaScript

## Promises
- A **Promise** in JavaScript is an object that represents the eventual completion (or failure) of an asynchronous operation and its resulting value. 
- Promises provide a cleaner and more manageable way to handle asynchronous code compared to callbacks, avoiding issues like **callback hell**.

- A Promise has three states:
  1. **Pending**: The initial state, neither fulfilled nor rejected.
  2. **Fulfilled**: The operation completed successfully, and the promise has a resulting value.
  3. **Rejected**: The operation failed, and the promise has a reason for the failure.

### Creating a custom Promise
You can create a custom Promise using the `Promise` constructor, which takes a function (called the executor) with two parameters: `resolve` and `reject`. These parameters are functions used to indicate success (`resolve`) or failure (`reject`) of the asynchronous operation.

#### Example: Custom Promise
```javascript
const delay = (ms) => {
  return new Promise((resolve, reject) => {
    if (ms < 0) {
      reject('Delay time cannot be negative');
    } else {
      setTimeout(() => {
        resolve(`Completed after ${ms} milliseconds`);
      }, ms);
    }
  });
};

// Using the custom Promise
delay(2000)
  .then((message) => {
    console.log(message); // Logs: "Completed after 2000 milliseconds"
  })
  .catch((error) => {
    console.error(error); // Logs error if delay time is negative
  });
```

#### Explanation:
1. `delay` Function:
    - Takes a time in milliseconds (`ms`) as input.
    Returns a new Promise.
    - If `ms` is negative, it rejects the Promise with an error message.
    - Otherwise, it uses `setTimeout` to resolve the Promise after the specified delay.

2. Using the Promise:
    - The `.then()` method is used to handle the resolved value.
    - The `.catch()` method is used to handle errors (rejected state).

This pattern is commonly used to wrap asynchronous operations (like file reading, API calls, etc.) in Promises.

## `async-await`
- With `async-await`, we have to use `try-catch` block for error handling. Here, `try-catch` block is nothing to do with `async-await`. It is a standard JavaScript feature.
