# Resources
## Notes
### Node.js Introduction
- Node.js is a runtime environment that allows you to execute JavaScript code outside of a web browser. It is build on the **V8 JavaScript engine** (the same engine that powers Google Chrome) and is designed for building scalable, high-performance, and server-side applications. Node.js is widely used for backend development, APIs, real-time applications, and more.

#### **Key concepts in Node.js**
1. **Single-threaded**:
Node.js operates on a single thread, meaning it uses a single main thread to handle all incoming requests. Unlike traditional multi-threaded server architectures, Node.js does not create a new thread for every request. Instead, it uses a single thread to manage all requests, which helps reduce overhead and improve performance.
2. **Event-driven**:
Node.js uses an event-driven architecture, where the flow of the program is determined by events (e.g., user requests, file I/O, timers). The Event Loop is a core part of Node.js, which listens for events and executes corresponding callback functions. This allows Node.js to handle multiple operations efficiently without blocking the main thread.
3. **Non-blocking I/O**:
Node.js uses non-blocking, asynchronous I/O operations. This means that when performing tasks like reading files, querying a database or, making network requests, Node.js does not wait for the operation to complete before moving on to the next task. Instead, it registers a callback function to handle the result once the operation is complete. This makes Node.js highly efficient for handling I/O-intensive tasks.

### Event Loop in Node.js
The **Event Loop** is a core mechanism in Node.js that allows it to handle multiple operations (like I/O tasks, timers, and user requests) efficiently on a **single thread**. It is the backbone of Node.js's **non-blocking**, **asynchronous architecture**.

#### How the Event Loop works
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

#### Example: Understanding the Event Loop
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

#### Output:
```
Start
End
Promise callback
Timeout callback
```

#### Explanation:
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

#### Key Takeaways:
- Synchronous code is executed first.
- Microtasks (like Promises) are executed before moving to the next Event Loop phase.
- Asynchronous callbacks (like `setTimeout`) are executed in their respective Event Loop phases.

### Loopback Address or localhost
- `127.0.0.1` is the loopback address or, localhost in networking. It is a special IP address that refers to the local machine (the computer running the code). When a server is bound to `127.0.0.1`, it means the server will only accept connections from the same machine and not from external device on the network.

#### Key Points
- **Localhost**: `127.0.0.1` is commonly referred to as `localhost`.
- **Purpose**: It is used for testing and development purposes to ensure the server is running correctly on the local machine.
- **Scope**: Only accessible from the local machine, not from other devices on the network.

If you want the server to be accessible from other devices on the network, you can use `0.0.0.0` or the machine's actual IP address instead of `127.0.0.1`.

### Package Versioning and Updating
In `package.json`, a version like `1.18.11` follows the **Semantic Versioning (SemVer)** format: `MAJOR.MINOR.PATCH`.
- **1 (MAJOR)**: Indicates a major version. Changes here introduce breaking changes that are not backward-compatible.
- **2 (MINOR)**: Indicates a minor version. Changes here add new features in a backwards-compatible manner.
- **3 (PATCH)**: Indicates a patch version. Changes here fix bugs or make small improvements without adding new features or breaking existing functionality.

### `^` and `~` difference
In the context of `package.json` versioning, `^` and `~` are used to specify version ranges for dependencies. Here's the difference:

- `^` (Caret)
    - Allows updates to **minor** and **patch** versions, but not major versions.
    - Example: `"^1.18.11"` means:
        - Compatible with versions `>=1.18.11` and `<2.0.0`.
        - It will accept updates like `1.19.0` or `1.18.12`, but not `2.0.0`.
- `~` (Tilde)
    - Allows updates to **patch** versions only, but not minor or major versions..
    - Example: `"~1.18.11"` means:
        - Compatible with versions `>=1.18.11` and `<1.19.0`.
        - It will accept updates like `1.18.12` but not `1.9.0`.
- Summary:
    - `^` is more flexible, allowing updates to both minor and patch versions.
    - `~` is more restrictive, allowing updates only to patch versions.

## Things to remember
- If you have opened node in terminal using the `node` command then you can exit by pressing `Ctrl + D` or `.exit`.
- To list all the outdated packages in a project, use `npm outdated` command.
