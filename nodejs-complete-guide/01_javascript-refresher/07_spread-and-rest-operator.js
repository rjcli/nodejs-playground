const hobbies = ['Sports', 'Cooking'];
const person = {
  name: 'Rashmi Raj',
  age: 29,
  greet() {
    console.log('Hi, I am ' + this.name);
  },
  tellMeYourAge: function () {
    console.log('My age is ' + this.age);
  },
};

const copiedArray1 = hobbies.slice();

console.log(hobbies);
console.log(copiedArray1);

const copiedArray2 = [hobbies];
console.log(copiedArray2);

// Spread operator
const copiedArray3 = [...hobbies];
console.log(copiedArray3);

const copiedPerson = { ...person };
console.log(copiedPerson);

// Rest operator
const toArray = (...args) => {
  return args;
};

console.log(toArray(1, 2, 3, 4));
