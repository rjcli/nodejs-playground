# Event Loop

## Event Loop in Node.js
The **Event Loop** is a core mechanism in Node.js that allows it to handle multiple operations (like I/O tasks, timers, and user requests) efficiently on a **single thread**. It is the backbone of Node.js's **non-blocking**, **asynchronous architecture**.

### How the Event Loop works
1. **Single Thread**: 
Node.js runs on a single thread, but it can handle many tasks concurrently using the Event Loop.
2. **Phase of the Event Loop**:
The Event Loop has several phases, and each phase handles specific types of operations. These phases are executed in a loop, ensuring that all tasks are processed. The main phases are:
    - **Timers**: Executes callback for `setTimeout()` and  `setInterval()`.
    - **Pending Callbacks**: Executes I/O callbacks that were deferred (e.g., errors from file operations).
    - **Idle, Prepare**: Internal use only.
    - **Poll**: Retrieves new I/O events and executes their callbacks (e.g., reading files, network requests).
    - **Check**: Executes callback for `setImmediate()`.
    - **Close Callbacks**: Executes callback for closed resources (e.g., `socket.on('close')`).
3. **Callback Queue**:
    - When an asynchronous operation (like reading a file) is initiated, Node.js delegates the task to the system (e.g., the file system or network).
    - Once the operation is complete, its callback is added to the appropriate queue.
    - The Event Loop picks up these callbacks and executes them in the correct phase.
4. **Non-blocking Nature**:
    - While waiting for I/O operations to complete, the Event Loop continues to process other tasks, ensuring that the main thread is never blocked.

![The Heart of NodeJS: Event Loop](img/event-loop.png)

![Event Loop in detail](img/event-loop-in-detail.png)

## Event Loop Phases
1. **Timers Phase**: Executes `setTimeout` and `setInterval` callbacks.
2. **I/O Callbacks Phase**: Executes I/O-related callbacks (e.g., `fs.readFile`).
3. **Idle, Prepare Phase**: Internal use only.
4. **Poll Phase**: Retrieves new I/O events; executes I/O-related callbacks.
5. **Check Phase**: Executes `setImmediate` callbacks.
6. **Close Callbacks Phase**: Executes close event callbacks (e.g., `socket.on('close', ...)`).

### Example: Understanding the Event Loop
```javascript
console.log('Start');

setTimeout(() => {
  console.log('Timeout callback');
}, 0);

Promise.resolve().then(() => {
  console.log('Promise callback');
});

console.log('End');
```

### Output:
```
Start
End
Promise callback
Timeout callback
```

### Explanation:
1. **Synchronous Code**: 
    - The `console.log('Start')` and `console.log('End')` are synchronous operations, so they are executed immediately in the **main thread**.
2. **setTimeout**:
    - The `setTimeout` callback is registered in the **Timers phase** of the Event Loop.
    - Even though the timeout is `0ms`, the callback is not executed immediately. It is added to the **callback queue** and will only be executed after the synchronous code and microtasks (like Promises) are completed.
3. **Promise**:
    - The `Promise.resolve().then()` is a **microtask**. Microtasks are executed before moving to the next phase of the Event Loop, so it runs after the synchronous code but before the `setTimeout` callback.
4. **Event Loop Execution**:
    - The Event Loop processes the synchronous code first (`Start` and `End`).
    - Then, it processes the **microtasks** (Promise callback).
    - Finally, it processes the **Timers phase**, executing the `setTimeout` callback.

### Key Takeaways:
- Synchronous code is executed first.
- Microtasks (like Promises) are executed before moving to the next Event Loop phase.
- Asynchronous callbacks (like `setTimeout`) are executed in their respective Event Loop phases.

## Summary of the Event Loop: Node vs Others
It is the developer's responsibility not to block the main thread in Node.js. By using asynchronous operations and callbacks, you can ensure that the Event Loop continues to process tasks efficiently.

Make sure to avoid the following tasks:
- Don’t use sync versions of functions in `fs`, `crypto` and `zlib` modules in your callback functions
- Don’t perform complex calculations (e.g. loops inside loops)
- Be careful with JSON in large objects
- Don’t use too complex regular expressions (e.g. nested quantifiers)

![Summary of the Event Loop: Node vs Others](img/node-vs-others.png)

## Event loop example
```javascript
const fs = require('fs');

setTimeout(() => {
  console.log('Timer 1 finished');
}, 0);

global.setImmediate(() => {
  console.log('Immediate 1 finished');
});

fs.readFile('./test-file.txt', () => {
  console.log('I/O finished');
  console.log('--------------------------');

  setTimeout(() => {
    console.log('Timer 2 finished');
  }, 0);

  setTimeout(() => {
    console.log('Timer 3 finished');
  }, 3000);

  global.setImmediate(() => {
    console.log('Immediate 2 finished');
  });

  global.process.nextTick(() => {
    console.log('Process.nextTick');
  });
});

console.log('Hello from the top-level code');
```

### Execution Order
1. `Hello from the top-level code`
2. `Timer 1 finished`
3. `Immediate 1 finished`
4. `I/O finished`
5. `--------------------------`
6. `Process.nextTick`
7. `Immediate 2 finished`
8. `Timer 2 finished`
9. `Timer 3 finished` (after 3 seconds)

### Explanation
#### 1. `Hello from the top-level code`
- This is the first line of synchronous code. It executes immediately because it's not inside any callback or asynchronous function.

#### 2. `Timer 1 finished`
- The `setTimeout` with a delay of `0` milliseconds is scheduled in the **Timers Phase** of the event loop. Even though the delay is `0`, it doesn't execute immediately. It waits for the current synchronous code to finish and then executes in the next iteration of the event loop.

#### 3. `Immediate 1 finished`
- The `setImmediate` callback is scheduled in the **Check Phase** of the event loop. It executes after the **Timers Phase** (where `setTimeout` callbacks are executed) and the **I/O Callbacks Phase**.

#### 4. `I/O finished` and `--------------------------`
- The `fs.readFile` callback is executed in the **I/O Callbacks Phase** of the event loop. This phase handles I/O operations like reading files. Once the file reading is complete, the callback is executed.

#### 5. `Process.nextTick`
- The `process.nextTick` callback is executed immediately after the current operation completes, before moving to the next phase of the event loop. It has the highest priority among microtasks and executes right after the `fs.readFile` callback.

#### 6. `Immediate 2 finished`
- The `setImmediate` callback inside the `fs.readFile` callback is scheduled in the **Check Phase** of the event loop. It executes after the current phase (I/O Callbacks Phase) and any `process.nextTick` callbacks.

#### 7. `Timer 2 finished`
- The `setTimeout` with a delay of `0` milliseconds inside the `fs.readFile` callback is scheduled in the **Timers Phase** of the event loop. It executes in the next iteration of the event loop, after the current phase and any `process.nextTick` callbacks.

#### 8. `Timer 3 finished` (after 3 seconds)
- The `setTimeout` with a delay of `3000` milliseconds inside the `fs.readFile` callback is scheduled in the **Timers Phase** of the event loop. It executes after approximately 3 seconds.

## Key Points
- **`process.nextTick`** executes immediately after the current operation, before moving to the next phase.
- **`setImmediate`** executes in the **Check Phase**, after I/O events and before close callbacks.
- **`setTimeout`** with a delay of `0` doesn't execute immediately; it waits for the next iteration of the event loop.

### Why `setImmediate` executes before `setTimeout` (in above example)

- When the `fs.readFile` callback is executed, the Event Loop is in the **Poll Phase**.
- After the I/O callback finishes, the Event Lop moves to the **Check Phase** (where `setImmediae` is executed) before returning to the **Timers Phase** (where `setTimeout` is executed).
- Even though `setTimeout` has a delay of `0ms`, it is queued in the **Timers Phase**, which comes after the **Check Phase**.

### Event Loop Phases Relevant to This Case:
1. **Poll Phase**:
    - This is where Node.js waits for I/O operations to complete (e.g., `fs.readFile`).
    - Once the I/O operation finishes, its callback is executed.
    - After executing the I/O callback, the Event Loop checks for any `setImmediate` callbacks and moves to the **Check Phase**.
2. **Check Phase**:
    - This is where `setImmediate` callbacks are executed.
3. **Timers Phase**:
    - This is where `setTimeout` and `setInterval` callbacks are executed, but only if their delay has expired.

### Key Takeaway:
- `setImmediate` is executed in the **Check Phase**, which occurs before the **Timers Phase** where `setTimeout` is executed. This is why `setImmediate` runs before `setTimeout` in this scenario.
