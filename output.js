// var person = {
//   name: "John",
//   greet: function () {
//     console.log(this);
//     console.log("Hello, my name is " + this.name);
//   },
// };

// var greetFunction = person.greet;
// greetFunction();

let a =1;
let b =2;

let c = {
    a: 10,
    b: 11
}

function add () {
    console.log(this.a, window.b);
}

c.add = add;
c.add()
add();
// console.log(window)
