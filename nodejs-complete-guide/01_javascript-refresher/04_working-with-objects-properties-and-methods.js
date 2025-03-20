const person = {
  name: 'Rashmi Raj',
  age: 29,
  // Here, don't prefer to use arrow functions because
  // this keyword will point to global context here.
  // greet: () => {
  //   console.log('Hi, I am ' + this.name);
  // },

  // Either create member function like this
  greet() {
    console.log('Hi, I am ' + this.name);
  },
  // Or like this
  tellMeYourAge: function () {
    console.log('My age is ' + this.age);
  },
};

person.greet();
person.tellMeYourAge();
