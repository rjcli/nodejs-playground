# Introduction to NodeJS and `npm`

## Node.js Introduction
- Node.js is a runtime environment that allows you to execute JavaScript code outside of a web browser. It is build on the **V8 JavaScript engine** (the same engine that powers Google Chrome) and is designed for building scalable, high-performance, and server-side applications. Node.js is widely used for backend development, APIs, real-time applications, and more.

### **Key concepts in Node.js**
1. **Single-threaded**:
Node.js operates on a single thread, meaning it uses a single main thread to handle all incoming requests. Unlike traditional multi-threaded server architectures, Node.js does not create a new thread for every request. Instead, it uses a single thread to manage all requests, which helps reduce overhead and improve performance.
2. **Event-driven**:
Node.js uses an event-driven architecture, where the flow of the program is determined by events (e.g., user requests, file I/O, timers). The Event Loop is a core part of Node.js, which listens for events and executes corresponding callback functions. This allows Node.js to handle multiple operations efficiently without blocking the main thread.
3. **Non-blocking I/O**:
Node.js uses non-blocking, asynchronous I/O operations. This means that when performing tasks like reading files, querying a database or, making network requests, Node.js does not wait for the operation to complete before moving on to the next task. Instead, it registers a callback function to handle the result once the operation is complete. This makes Node.js highly efficient for handling I/O-intensive tasks.

## Loopback Address or localhost
- `127.0.0.1` is the loopback address or, localhost in networking. It is a special IP address that refers to the local machine (the computer running the code). When a server is bound to `127.0.0.1`, it means the server will only accept connections from the same machine and not from external device on the network.

### Key Points
- **Localhost**: `127.0.0.1` is commonly referred to as `localhost`.
- **Purpose**: It is used for testing and development purposes to ensure the server is running correctly on the local machine.
- **Scope**: Only accessible from the local machine, not from other devices on the network.

If you want the server to be accessible from other devices on the network, you can use `0.0.0.0` or the machine's actual IP address instead of `127.0.0.1`.

## Package Versioning and Updating
In `package.json`, a version like `1.18.11` follows the **Semantic Versioning (SemVer)** format: `MAJOR.MINOR.PATCH`.
- **1 (MAJOR)**: Indicates a major version. Changes here introduce breaking changes that are not backward-compatible.
- **2 (MINOR)**: Indicates a minor version. Changes here add new features in a backwards-compatible manner.
- **3 (PATCH)**: Indicates a patch version. Changes here fix bugs or make small improvements without adding new features or breaking existing functionality.

## `^` and `~` difference
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

## URL
Suppose a URL like `https://www.google.com/maps` then:
- `https://` is the protocol (`http://` or `https://`)
- `google.com` is the domain name.
- `maps` is the resource.
