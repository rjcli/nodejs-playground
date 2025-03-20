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

const hobbies = ['Sports', 'Cooking'];

const printName = (personData) => {
  console.log(personData.name);
};

const printNameWithDestructuring = ({ name, age }) => {
  console.log(name, age);
};

printName(person);
printNameWithDestructuring(person);

// Destructuring with objects
const { name, age } = person;
console.log(name, age);

// Destructuring with arrays (Any name can be used in place of hobby1 and hobby2)
const [hobby1, hobby2] = hobbies;
console.log(hobby1, hobby2);
