# Authentication, Authorization and Security

## What is JWT?
**JWT (JSON Web Token)** is a compact, URL-safe token format used for securely transmitting information between parties as a JSON object. It is commonly used for authentication and authorization in web applications.

### Key Features:
1. **Compact**: JWTs are small in size, making them ideal for use in HTTP headers.
2. **Self-Contained**: They contain all the necessary information about the user, eliminating the need for server-side sessions.
3. **Secure**: Information in a JWT is signed using a secret key (HMAC) or a public/private key pair (RSA or ECDSA), ensuring data integrity.

### Structure:
A JWT consists of three parts, separated by dots (`.`):
1. **Header**: Contains metadata about the token, such as the signing algorithm.
2. **Payload**: Contains the claims (user data or other information).
3. **Signature**: Ensures the token has not been tampered with.

![JWT Structure](img/jwt-structure.png)

### Example
```text
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ZfjsdfJJF78VFfjdkY3Y2I2ODYwYmE3NCIsImlhdCI6MTc0MzY0MDg3NywiZXhwIjoxNzUxNDE2ODc3fQ.VgmKn4KHrvLqz4t7_vfzQBnq7hcMvznK4n8w468hZu4
```

### Common Use Cases:
1. **Authentication**: Verifies the identity of a user.
2. **Authorization**: Grants access to specific resources based on user roles or permissions.

### Advantages:
- **Stateless**: No need to store session data on the server.
- **Portable**: Can be used across different domains and platforms.

### Example Workflow:
1. User logs in and provides credentials.
2. Server validates the credentials and generates a JWT.
3. The JWT is sent to the client and stored (e.g., in **localStorage** or **cookies**).
4. The client includes the JWT in the `Authorization` header for subsequent requests.
5. The server verifies the JWT and processes the request.

![JWT Workflow](img/jwt-workflow.png)

### How Signing and Verifying works with JWT
![alt text](img/jwt-signing-and-verifying.png)

JWTs are widely used for secure and efficient authentication in modern web applications.

## Purpose of Using `findByIdAndUpdate` Instead of `findById`

The `findByIdAndUpdate` method in Mongoose is used to update a document in the database in a single operation. It is preferred over using `findById` followed by manually setting fields and saving the document when you want to avoid issues related to **mandatory fields** or **validation requirements**.

### Key Advantages of `findByIdAndUpdate`:

1. **Avoids Missing Mandatory Fields**:
    - When using `findById` and manually updating fields, you need to ensure that all required fields (mandatory fields) are present before saving the document.
    - If any mandatory field is accidentally omitted, the save operation will fail due to validation errors.
    - `findByIdAndUpdate` only updates the specified fields (`filteredBody`) and leaves the other fields untouched, ensuring that mandatory fields remain intact.

    **Example**:
    ```javascript
    // Using findById and manual update
    const user = await User.findById(req.user.id);
    user.name = req.body.name; // Only updating the name
    await user.save(); // This might fail if other mandatory fields are missing
    ```
    **With `findByIdAndUpdate`**
    ```javascript
    const updatedUser = await User. findByIdAndUpdate(req.user.id,  filteredBody, {
      new: true,
      runValidators: true,
    }); // Only updates the specified fields, leaving mandatory fields untouched
    ```
2. **Validation with `runValidators`**:
- The `runValidators: true` option ensures that the updated fields are validated against the schema rules.
- This prevents invalid data from being saved to the database.

3. **Atomic Operation**:
- `findByIdAndUpdate` performs the update in a single database operation, reducing the risk of race conditions or partial updates.

4. **Simpler Code**:
- Using `findByIdAndUpdate` eliminates the need to manually fetch the document, update fields, and save it. This makes the code cleaner and easier to maintain.

### Why Not Use `findById` and Manual Updates?
- When using `findById`, you must ensure that all required fields are present before saving the document. This adds complexity and increases the risk of validation errors if any mandatory field is missing.
- `findByIdAndUpdate` avoids this issue by only updating the specified fields while keeping the rest of the document intact.

### Conclusion:
Using `findByIdAndUpdate` is a safer and more efficient approach when updating specific fields in a document, especially when dealing with schemas that have mandatory fields. It ensures that required fields are not accidentally omitted and simplifies the update process.

## Security Best Practices and Suggestions
![Security Best Practices and Suggestions](img/security-best-practices-and-suggestions.png)

### Security Best Practices and Suggestions

This section outlines key practices to enhance the security of an application. 

### Key Security Best Practices:

1. **Use HTTPS**:
    - Always use HTTPS to encrypt data in transit between the client and server.
    - Prevents attackers from intercepting sensitive information like passwords or tokens.

2. **Secure Password Storage**:
    - Hash passwords using strong algorithms like `bcrypt` before storing them in the database.
    - Never store plain-text passwords.

3. **Implement Authentication and Authorization**:
    - Use secure methods like **JWT** for authentication.
    - Ensure proper role-based access control (RBAC) to restrict access to sensitive resources.

4. **Validate and Sanitize User Input**:
    - Prevent injection attacks (e.g., SQL Injection, NoSQL Injection) by validating and sanitizing all user inputs.
    - Use libraries like `validator.js` or built-in Mongoose validation.

5. **Prevent Cross-Site Scripting (XSS)**:
    - Escape user-generated content before rendering it in the browser.
    - Use libraries like `DOMPurify` to sanitize HTML.

6. **Prevent Cross-Site Request Forgery (CSRF)**:
    - Use CSRF tokens to protect against unauthorized actions performed by malicious websites on behalf of authenticated users.

7. **Set Secure HTTP Headers**:
    - Use libraries like `helmet` to set secure HTTP headers (e.g., `Content-Security-Policy`, `X-Frame-Options`, `Strict-Transport-Security`).

8. **Limit Rate of Requests**:
    - Implement rate limiting to prevent brute-force attacks and abuse of APIs.
    - Use libraries like `express-rate-limit`.

9. **Log and Monitor**:
    - Log all critical actions and monitor logs for suspicious activities.
    - Use tools like `Winston` or `Morgan` for logging.

10. **Handle Errors Gracefully**:
      - Avoid exposing sensitive error details to the client.
      - Use centralized error-handling middleware to log errors and send user-friendly messages.

### JWT Token Usage:
- Pass the JWT token in the **Authorization** header in the format:
  ```json
  { "Authorization": "Bearer <JWT_TOKEN>" }
  ```
- Ensure the token is signed and verified securely.

By following these best practices, you can significantly enhance the security of your application and protect it from common vulnerabilities.

## What is a Cookie?

A **cookie** is a small piece of data stored on the user's browser by a website. It is sent along with every HTTP request to the server, allowing the server to identify users, maintain sessions, and store user-specific information.

### Key Features of Cookies:
1. **Storage**:
   - Cookies are stored in the user's browser and can persist across sessions (depending on their expiration settings).

2. **Data Transmission**:
   - Cookies are automatically sent with every HTTP request to the server, making them useful for maintaining state in stateless HTTP.

3. **Key-Value Pairs**:
   - Cookies store data as key-value pairs, e.g., `sessionId=abc123`.

4. **Expiration**:
   - Cookies can have an expiration date, after which they are automatically deleted.

5. **Scope**:
   - Cookies can be scoped to specific domains and paths, restricting where they are sent.

### Common Use Cases:
1. **Session Management**:
   - Storing session IDs to maintain user sessions (e.g., login sessions).

2. **Personalization**:
   - Storing user preferences, such as language or theme.

3. **Tracking**:
   - Tracking user behavior for analytics or targeted advertising.

### Example of a Cookie:
#### Setting a Cookie in HTTP Response:
```http
Set-Cookie: sessionId=abc123; HttpOnly; Secure; Max-Age=3600
```

#### Explanation
- `sessionId=abc123`: Key-value pair storing the session ID.
- `HttpOnly`: Prevents client-side JavaScript from accessing the cookie.
- `Secure`: Ensures the cookie is sent only over HTTPS.
- `Max-Age=3600`: Sets the cookie to expire in 1 hour.

### Setting Cookies in Node.js:
#### Using Express
```javascript
res.cookie('sessionId', 'abc123', {
  httpOnly: true,
  secure: true,
  maxAge: 3600000, // 1 hour
});
```

#### Reading Cookies
```javascript
const cookies = req.cookies;
console.log(cookies.sessionId); // Output: abc123
```

### Types of Cookies:
1. **Session Cookies**:
    - Temporary cookies that are deleted when the browser is closed.
2. **Persistent Cookies**:
    - Cookies with an expiration date that persist across browser sessions.
3. **Secure Cookies**:
    - Sent only over HTTPS connections.
4. **HttpOnly Cookies**:
    - Accessible only by the server, not by client-side JavaScript.

### Security Considerations:
1. **HttpOnly**:
    - Prevents cookies from being accessed by client-side scripts, mitigating XSS attacks.
2. **Secure**:
    - Ensures cookies are sent only over encrypted HTTPS connections.
3. **SameSite**:
    - Restricts cookies from being sent with cross-site requests, reducing CSRF attacks.

Cookies are a fundamental part of web development, enabling stateful interactions in a stateless HTTP protocol.

## What is Rate Limiting?

**Rate limiting** is a technique used to control the number of requests a client can make to a server within a specific time frame. It is commonly implemented in web applications to prevent abuse, such as **DDoS attacks**, **brute-force attacks**, or excessive API usage.

### Key Features of Rate Limiting:
1. **Request Control**:
   - Limits the number of requests a client (e.g., IP address or user) can make in a given time period.

2. **Prevents Abuse**:
   - Protects the server from being overwhelmed by malicious or excessive requests.

3. **Improves Performance**:
   - Ensures fair usage of server resources by all clients.

4. **Customizable**:
   - Can be configured based on IP address, user ID, or API key.

### Common Use Cases:
1. **API Protection**:
   - Prevents clients from overloading APIs with excessive requests.
2. **Brute-Force Prevention**:
   - Limits login attempts to prevent brute-force attacks.
3. **DDoS Mitigation**:
   - Reduces the impact of Distributed Denial of Service (DDoS) attacks by throttling requests.

### Example in Express:
Using the `express-rate-limit` package to implement rate limiting:
```javascript
const rateLimit = require('express-rate-limit');

// Define rate limiting middleware
const limiter = rateLimit({
  max: 100, // Maximum number of requests
  windowMs: 60 * 60 * 1000, // Time window: 1 hour
  message: 'Too many requests from this IP, please try again later.',
});

// Apply rate limiting to /api routes 
app.use('/api', limiter);
```

### How It Works:
1. Track Requests:
    - The server tracks the number of requests made by each client (e.g., based on IP address).
2. Enforce Limits:
    - If a client exceeds the allowed number of requests within the time window, the server blocks further requests and sends an error response. But if the app crashes, then the limit gets reset.

### Benefits:
1. Security:
    - Protects against malicious activities like brute-force attacks and DDoS.
2. Fair Usage:
    - Ensures all clients have equal access to server resources.
3. Scalability:
    - Helps maintain server performance under high traffic.

### Example Response for Exceeded Limit:
```json
{
  "status": "fail",
  "message": "Too many requests from this IP, please try again later."
}
```

Rate limiting is an essential security and performance optimization technique for modern web applications.

## NoSQL Query Injection
- **NoSQL Query Injection** is a security vulnerability that occurs when an attacker manipulates a NoSQL database query by injecting malicious input. 
- This is similar to **SQL injection** but targets **NoSQL databases** like **MongoDB**. 
- It exploits the flexibility of **NoSQL queries**, which often accept **JSON-like** structures, to bypass authentication or manipulate data.

### How NoSQL Query Injection Works:
1. **Input Manipulation**:
   - NoSQL databases like MongoDB allow queries in JSON format. If user input is not properly validated or sanitized, attackers can inject malicious JSON objects into the query.

2. **Bypassing Authentication**:
   - Attackers can inject conditions like `$gt` (greater than) or `$or` to manipulate the query logic and bypass authentication checks.

3. **Exploitation**:
   - The injected query is executed by the database, potentially exposing sensitive data or allowing unauthorized access.

### Example of NoSQL Query Injection:

#### Vulnerable Code:
```javascript
const user = await User.findOne({ email: req.body.email, password: req.body.password });
```

This code directly uses user input (`req.body.email` and `req.body.password`) in the query without validation or sanitization.

#### Malicious Input
```javascript
{
  "email": { "$gt": "" },
  "password": "correctPassword"
}
```

#### How It Works:
- The injected query `{ "$gt": "" }` exploits MongoDB's `$gt` (greater than) operator.
- The condition `{ email: { "$gt": "" } }` matches any non-empty string, effectively bypassing the email check. Basically, it returns true for all the emails and the password is checked against all the emails.
- If the password is correct, the attacker gains unauthorized access.

#### Example of Exploited Query:
The query executed by the database becomes:
```javascript
User.findOne({
  email: { "$gt": "" },
  password: "correctPassword"
});
```

This matches any user with a valid password, bypassing the email check.

#### How to Prevent NoSQL Query Injection:
1. **Input Validation**:
    - Validate and sanitize all user inputs to ensure they conform to expected formats.
    - Use libraries like `validator.js` to validate input fields.
2. **Use Parameterized Queries**:
    - Avoid directly embedding user input in queries. Use safe query-building techniques.
3. **Disable Operators in User Input**:
    - Prevent the use of special operators like `$gt`, `$or`, etc., in user input by explicitly checking for them.
4. **Authentication Middleware**:
    - Use middleware to enforce authentication and authorization checks.
5. **Use Strong Authentication**:
    - Implement secure authentication mechanisms like JWT to prevent unauthorized access.

#### Secure Code Example
```javascript
const user = await User.findOne({
  email: req.body.email,
  password: req.body.password,
}).select('+password');

if (!user) {
  throw new AppError('Invalid email or password', 401);
}
```

Ensure that only valid email and password combinations are processed.

### Conclusion:
NoSQL query injection is a serious security vulnerability that can compromise the integrity of your application. By validating user input, sanitizing queries, and following secure coding practices, you can protect your application from such attacks.

## Cross Side Scripting (XSS)
- **XSS (Cross-Site Scripting)** is a type of security vulnerability that allows attackers to inject malicious scripts into web pages viewed by other users. 
- These scripts are executed in the victim's browser, enabling attackers to steal sensitive information, hijack sessions, or perform malicious actions on behalf of the user.

### How XSS Works:
1. **Injection**:
   - An attacker injects malicious scripts (e.g., JavaScript) into a web application, typically through user input fields or query parameters.

2. **Execution**:
   - The injected script is included in the web page and executed in the victim's browser when they visit the affected page.

3. **Exploitation**:
   - The malicious script can steal cookies, session tokens, or other sensitive data, or perform actions on behalf of the victim.

### Types of XSS Attacks:
1. **Stored XSS**:
   - The malicious script is permanently stored on the server (e.g., in a database or comment section).
   - It is executed whenever a victim accesses the affected page.
   - **Example**: A user posts a comment containing `<script>alert('Hacked!')</script>`.

2. **Reflected XSS**:
   - The malicious script is included in the URL or request and reflected back to the victim in the server's response.
   - **Example**: A URL like `http://example.com/search?q=<script>alert('Hacked!')</script>`.

3. **DOM-Based XSS**:
   - The malicious script is executed directly in the browser by manipulating the DOM (Document Object Model) without involving the server.
   - **Example**: A script injected into a client-side JavaScript function.

### Example of XSS Attack:
#### Vulnerable Code:
```javascript
app.get('/search', (req, res) => {
  const query = req.query.q;
  res.send(`<h1>Search Results for ${query}</h1>`);
});
```

#### Malicious Input
```http
http://example.com/search?q=<script>alert('Hacked!')</script>
```

#### Result
The browser executes the injected script, displaying an alert box with the message `"Hacked!"`.

### How to Prevent XSS Attacks:
1. **Escape User Input**:
    - Escape special characters in user input before rendering it in HTML.
    - **Example**: Convert < to `&lt;` and > to `&gt;`.
2. **Use Content Security Policy (CSP)**:
    - Implement a CSP to restrict the execution of unauthorized scripts.
    - **Example**:
    ```
    Content-Security-Policy: script-src 'self';
    ```
3. **Sanitize User Input**:
    - Use libraries like `DOMPurify` to sanitize HTML and remove malicious scripts.
4. **Validate Input**:
    - Validate and sanitize all user inputs on both the client and server sides.
5. **Use HTTP-Only Cookies**:
    - Store sensitive data like session tokens in HTTP-only cookies to prevent access by JavaScript.
6. **Avoid Inline JavaScript**:
    - Avoid using inline JavaScript in HTML attributes like `onclick` or `<script>` tags.

### Secure Code Example
```javascript
const escapeHtml = (str) => {
  return str.replace(/</g, '&lt;').replace(/>/g, '&gt;');
};

app.get('/search', (req, res) => {
  const query = escapeHtml(req.query.q);
  res.send(`<h1>Search Results for ${query}</h1>`);
});
```

### Why XSS is Dangerous:
- **Steals Sensitive Data**:
    - Attackers can steal cookies, session tokens, or other sensitive information.
- **Hijacks User Sessions**:
    - Attackers can impersonate users by hijacking their sessions.
- **Performs Malicious Actions**:
    - Attackers can perform actions on behalf of the user, such as transferring funds or changing account settings.

### Conclusion:
XSS is a critical security vulnerability that can compromise the integrity and confidentiality of web applications. By validating and sanitizing user input, escaping special characters, and implementing security headers like CSP, you can effectively prevent XSS attacks. 

## Parameter Pollution
- **Parameter pollution** is a security vulnerability that occurs when an attacker sends multiple parameters with the same name in a query string or request body. 
- This can lead to unexpected behavior in the application, such as overriding values, bypassing validation, or causing application crashes.

### How Parameter Pollution Works:
1. **Duplicate Parameters**:
   - When multiple parameters with the same name are sent in a request, the server may process them in unexpected ways.
   - **Example**: `?role=admin&role=user`

2. **Exploitation**:
   - Attackers can exploit this behavior to bypass security checks or inject malicious data.

### Example of Parameter Pollution:

#### Vulnerable Code:
```javascript
app.get('/example', (req, res) => {
  const role = req.query.role;
  if (role === 'admin') {
    res.send('Access granted to admin');
  } else {
    res.send('Access denied');
  }
});
```

#### Malicious Request
```http
GET /example?role=admin&role=user
```

#### Result
- Depending on how the server processes duplicate parameters, the `role` value might be:
    - `admin`: If the server uses the first occurrence.
    - `user`: If the server uses the last occurrence.
    - `['admin', 'user']`: If the server treats it as an array.

This can allow attackers to bypass security checks (e.g., gaining admin access).

### How to Prevent Parameter Pollution:
1. **Use Middleware to Sanitize Parameters**:
    - Use libraries like hpp (HTTP Parameter Pollution) to prevent duplicate parameters.
    **Example**:
    ```javascript
    const hpp = require('hpp');
    app.use(hpp());
    ```
2. **Validate Input**:
    - Validate and sanitize all incoming parameters to ensure they meet expected formats.
3. **Avoid Implicit Behavior**:
    - Avoid relying on implicit behavior when handling duplicate parameters.
4. **Use Whitelists**:
    - Use whitelists to allow only specific parameters in requests.

### Secure Code Example
```javascript
const hpp = require('hpp');

// Prevent parameter pollution
app.use(hpp({ whitelist: ['sort', 'fields'] }));

app.get('/example', (req, res) => {
  const role = req.query.role;
  if (role === 'admin') {
    res.send('Access granted to admin');
  } else {
    res.send('Access denied');
  }
});
```

### Why Parameter Pollution is Dangerous:
- **Bypasses Security**:
    - Attackers can bypass validation or authorization checks.
- **Unexpected Behavior**:
    - Applications may behave unpredictably when processing duplicate parameters.
- **Data Integrity Issues**:
    - Can lead to incorrect or malicious data being processed.

By sanitizing parameters and using libraries like `hpp`, you can effectively prevent parameter pollution and secure your application. 

**Note**: We pass the JWT token from *Postman's Headers tab* with Authorization key and the value should start with **Bearer followed by one whitespace** and then the actual JWT token like `{"Authorization": "Bearer <JWT_TOKEN>"}`.

