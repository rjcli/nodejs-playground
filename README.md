# NodeJS Playground
Welcome to my NodeJS Learning repository! This repository is dedicated to helping me learn and practice NodeJS. It contains a variety of exercises, tutorial codes, and mini-projects designed to enhance my understanding of NodeJS.

## Things to remember
- If you have opened node in terminal using the `node` command then you can exit by pressing `Ctrl + D` or `.exit`.
- To list all the outdated packages in a project, use `npm outdated` command.
- To close a process running on `localhost:3000` in Windows, first identify the process ID (PID) using `netstat -ano | findstr :3000`, then use `taskkill /PID <PID> /F` to terminate it. You'll get the process ID with the `netstat` command (Here, `19860` is the PID).
```bash
TCP    0.0.0.0:3000           0.0.0.0:0              LISTENING       19860
```

## Resources
- [NodeJS Bootcamp GitHub repository](https://github.com/jonasschmedtmann/complete-node-bootcamp)
- [ESLint](https://eslint.org/)
- [Validator](https://github.com/validatorjs/validator.js/)
- [MongoDB Docs](https://www.mongodb.com/docs/manual/)

## Skip pre-commit hook command
First stages the files you want to commit and then use the following command.
```bash
NO_VERIFY_YOLO=1 git commit -m "Your commit message"
```


## Credits
- The folder `nodejs-complete-bootcamp` follows the Udemy course [Node.js, Express, MongoDB & More: The Complete Bootcamp](https://www.udemy.com/course/nodejs-express-mongodb-bootcamp/) by [Jonas Schmedtmann](https://www.udemy.com/user/jonasschmedtmann/).
- The folder `nodejs-complete-guide` follows the Udemy course [NodeJS - The Complete Guide (MVC, REST APIs, GraphQL, Deno)](https://www.udemy.com/course/nodejs-the-complete-guide) by [Maximilian Schwarzmüller
](https://www.udemy.com/user/maximilian-schwarzmuller/).
