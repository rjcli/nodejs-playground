const name = 'Rashmi';
let age = 29;
const hasHobbies = true;

const summarizeUser = (userName, userAge, userHasHobby) => {
  return (
    'Name is ' +
    userName +
    ', age is ' +
    userAge +
    ' and the user has hobbies: ' +
    userHasHobby
  );
};

const add = (a, b) => {
  return a + b;
};

// In case of only one argument, the parenthesis can be omitted.
const addOne = (a) => a + 1;

const multiply = (a, b) => a * b;

console.log(add(5, 6));
console.log(multiply(5, 6));
console.log(addOne(5));

console.log(summarizeUser(name, age, hasHobbies));
