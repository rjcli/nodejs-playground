# Pug with Express

## What is Pug?
- **Pug** (formerly known as Jade) is a high-performance template engine for Node.js. 
- It allows developers to write HTML in a cleaner and more concise syntax. 
- Pug is widely used in web applications to generate dynamic HTML pages.

### Features of Pug:

1. **Clean and Minimal Syntax**:
    - Pug uses indentation-based syntax, eliminating the need for closing tags and reducing boilerplate code.
    - Example:
      ```pug
      doctype html
      html
        head
          title My Page
        body
          h1 Welcome to Pug
      ```

2. **Dynamic Content**:
    - Pug supports embedding JavaScript expressions directly in the template.
    - Example:
      ```pug
      h1= user.toUpperCase()
      ```

3. **Variables and Locals**:
    - Pass variables to Pug templates and use them dynamically.
    - Example:
      ```pug
      h1= title
      ```

4. **Conditionals and Loops**:
    - Pug supports `if`, `else`, and loops like `each` for dynamic rendering.
    - Example:
      ```pug
      if isLoggedIn
        h1 Welcome, #{user}
      else
        h1 Please log in
      ```

5. **Mixins**:
    - Reusable blocks of code that can accept arguments.
    - Example:
      ```pug
      mixin button(text)
        button= text

      +button('Click Me')
      ```

6. **Includes and Extends**:
    - Modularize templates by including or extending other templates.
    - Example:
      ```pug
      include header.pug
      extends layout.pug
      ```

7. **HTML Attributes**:
    - Easily define attributes for HTML elements.
    - Example:
      ```pug
      a(href='https://example.com' target='_blank') Visit Example
      ```

8. **Comments**:
    - Supports both unbuffered (`//`) and buffered (`//-`) comments.
    - Example:
      ```pug
      // This is a Pug-only comment
      //- This will appear in the HTML
      ```

9. **Integration with Express**:
    - Pug integrates seamlessly with Express.js for rendering dynamic views.

10. **Precompiled Templates**:
      - Pug templates can be precompiled into JavaScript functions for better performance.

### Advantages of Pug:
- Reduces repetitive HTML boilerplate.
- Improves readability and maintainability of templates.
- Supports dynamic content and logic directly in templates.
- Encourages modular and reusable code with mixins and includes.

Pug is an excellent choice for building dynamic and maintainable web applications with Node.js.

## Comments in Pug

Pug supports two types of comments: **unbuffered comments** and **buffered comments**.

### 1. **Unbuffered Comments**:
- These comments are included in the final HTML output.
- Use `//` to create unbuffered comments.

#### Example:
```pug
// This is an unbuffered comment
p This paragraph will be rendered in HTML
```

#### Output:
```html
<!-- This is a buffered comment -->
<p>This paragraph will be rendered in HTML</p>
```

### 2. **Buffered Comments**:
- These comments are not included in the final HTML output.
- Use `//-` to create unbuffered comments.

#### Example:
```pug
//- This is a buffered comment
p This paragraph will be rendered in HTML
```

#### Output:
```html
<p>This paragraph will be rendered in HTML</p>
```

### Summary:
- Use `//-` for comments that are only visible in the Pug file.
- Use `//` for comments that should appear in the rendered HTML.
