// let a =1;
// let b =2;

// let c = {
//     a: 10,
//     b: 11
// }

// function add () {
//     console.log(this.a, window.b);
// }

// c.add = add;
// c.add()
// add();
// console.log(window)

// ----------------------------------------------------------------------------------------------------------------------------


let a = 10;
var a = 20;
{
  console.log(a);
  let a = 20;
}
console.log(a);

// var has function scope that is why 29 and 30 number are in same scope


// ----------------------------------------------------------------------------------------------------------------------------

var person = {
    name: 'John',
    greet: function() {
      console.log('Hello, my name is ' + this.name);
    }
  };
  
  var greetFunction = person.greet;
  greetFunction();

//   Output: Hello, my name is undefined

//   Explanation: When greetFunction is called, 
//   it's invoked without any context, so this inside the greet function 
//   becomes the global object (window in a browser environment). 
//   However, the global object doesn't have a name property, hence this.name evaluates to undefined.
// ----------------------------------------------------------------------------------------------------------------------------

var person = {
    name: 'Alice',
    greet: function() {
      setTimeout(function() {
        console.log('Hello, my name is ' + this.name);
      }, 1000);
    }
  };
  
  person.greet();
// ----------------------------------------------------------------------------------------------------------------------------

//   Output: Hello, my name is undefined

// Explanation: Inside the setTimeout callback function, 
// this refers to the global object (window), not the person object. 
// Therefore, this.name evaluates to undefined.
  
function Person(name) {
    this.name = name;
  }
  
  Person.prototype.greet = function() {
    console.log('Hello, my name is ' + this.name);
  };
  
  var john = new Person('John');
  var greet = john.greet;
  greet();
  

//   Output: Hello, my name is undefined

// Explanation: Similar to the first question, 
// when greet is invoked without any context, this inside the greet 
// function refers to the global object (window). Since the global object 
// doesn't have a name property, this.name evaluates to undefined.

var button = document.getElementById('myButton');

button.addEventListener('click', function() {
  console.log(this);
});

// Output: The button DOM element will be logged to the console when clicked.

// Explanation: In event listeners, this refers to the target element that triggered the event.
//  So when the button is clicked, this inside the event listener function refers to the button element.

var obj = {
    foo: function() {
      console.log(this === obj);
      setTimeout(function() {
        console.log(this === obj);
      }, 0);
    }
  };
  obj.foo();

//   true
// false


//   Explanation: Inside the foo method, 
//   this refers to the obj object. However, inside the setTimeout callback function, 
//   this refers to the global object (window). This happens because regular functions defined with
//   function keyword have their own this binding, unlike arrow functions.
  

var person = {
    name: 'Alice',
    greet: function() {
      console.log('Hello, my name is ' + this.name);
    }
  };
  
  var boundGreet = person.greet.bind({ name: 'Bob' });
  boundGreet();

//   Output: Hello, my name is Bob

// Explanation: The bind method creates a new function where this is explicitly set to the object passed 
// as an argument. So in this case, boundGreet is a function where this is set to an object with name property 
// equal to 'Bob'. Therefore, when boundGreet is invoked, it logs 'Hello, my name is Bob'.

var obj = {
    x: 10,
    getX: function() {
        console.log(this.x)
        function inner() {
            console.log(this.x);
        }
        inner();
    }
};
obj.getX();

// 10
// undefined
// Here's the breakdown of why this happens:

// First console.log(this.x) inside getX:
// getX is called as a method of obj, so within getX, this refers to obj.
// this.x is therefore 10, so 10 is logged to the console.
// inner() function call:
// inner is a nested function inside getX. In JavaScript, the value of this inside a function depends on how the function is called.
// Since inner is called as a regular function (not as a method of an object), this inside inner defaults to the global object (window in browsers, global in Node.js) in non-strict mode, or is undefined in strict mode.
// Because there is no global variable x defined, this.x inside inner results in undefined being logged.

var obj = {
    x: 10,
    getX: function() {
        console.log(this.x)
        const inner = () => {
            console.log(this.x);
        }
        inner();
    }
};
obj.getX();

// 10
// 10
// Here's why this output occurs:

// First console.log(this.x) inside getX:
// getX is still called as a method of obj, so within getX, this refers to obj.
// this.x is 10, so 10 is logged to the console.
// inner() function call using an arrow function:
// inner is now defined as an arrow function. Arrow functions do not have their own this context; 
// instead, they inherit this from the enclosing execution context.
// Since inner is defined within getX where this refers to obj, the inherited this in inner also refers to obj.
// As a result, this.x inside inner is still 10, and 10 is logged again.
// ----------------------------------------------------------------------------------------------------------------------------


var obj1 = { x: 10 };
var obj2 = { x: 10 };
console.log(obj1 == obj2);
console.log(obj1 === obj2);

// false
// false
// Objects refrences are compared
// ----------------------------------------------------------------------------------------------------------------------------

let arr = [1, 2, 3];
function changeArray(array) {
    array.push(4);
    array = [4, 5, 6];
}
changeArray(arr);
console.log(arr);

// [1, 2, 3, 4]
// Here's a step-by-step explanation of why this happens:

// Initial array: arr is initially set to [1, 2, 3].
// Function call: The changeArray function is called with arr as an argument.
// Inside changeArray:
// array.push(4): This modifies the original array (arr) by adding the value 4 to the end. At this point, array and arr are both [1, 2, 3, 4] because arrays in JavaScript are reference types, and both array and arr refer to the same object in memory.
// array = [4, 5, 6]: This line assigns a new array [4, 5, 6] to the local variable array. However, this does not affect arr because array was a reference to the original array and now is assigned to a new array. This assignment changes the reference stored in array to point to a new object, but it does not modify the object that arr continues to reference.
// After function execution: arr remains [1, 2, 3, 4] because only the reference inside the function was changed to point to a new array, while the original array was only modified by the .push(4) operation.
// Thus, console.log(arr) will output [1, 2, 3, 4].

// ----------------------------------------------------------------------------------------------------------------------------

let originalArray = [1, 2, [3, 4]];
let shallowCopy = [...originalArray];
shallowCopy[2][0] = 100;
console.log(originalArray);

// [1, 2, [100, 4]]
// Here's why this happens:

// Original array setup: originalArray is initialized to [1, 2, [3, 4]].
// Creating a shallow copy: shallowCopy is created using the spread operator (...). This operator spreads the elements of originalArray into a new array. However, it only creates a shallow copy, meaning that while it copies the outer array, any nested arrays or objects are copied by reference.
// Modifying the shallow copy: shallowCopy[2][0] = 100; modifies the nested array [3, 4] inside shallowCopy. Since the nested array is shared between originalArray and shallowCopy (copied by reference), the change reflects in both arrays.
// Output: Therefore, when console.log(originalArray); is called, it outputs [1, 2, [100, 4]] because the nested array shared between originalArray and shallowCopy was modified through shallowCopy.
// ----------------------------------------------------------------------------------------------------------------------------


var a = 10;
function test(){
  a++;
  console.log(a);
  var a  = 20;
  console.log(a);
}
test();
console.log(a);

// ----------------------------------------------------------------------------------------------------------------------------



Array(1,2,3,4,5).forEach(v => {
    Promise.resolve().then(() => console.log('Promise:' + v));
    console.log('Console:' + v);
    setTimeout(() => console.log('TimeOut:' + v));
});
// ----------------------------------------------------------------------------------------------------------------------------



const firstPromise = new Promise((res, rej) => {
    setTimeout(res, 500, 'one');
});

const secondPromise = new Promise((res, rej) => {
    setTimeout(res, 100, 'two');
});

Promise.race([firstPromise, secondPromise]).then(res => console.log(res));

// ----------------------------------------------------------------------------------------------------------------------------

const myPromise = (text) => Promise.resolve('I have resolved ' + text);
 
function firstFunction() {
    myPromise('first').then(res => console.log(res));
    console.log('first');
}
 
async function secondFunction() {
    console.log(await myPromise('second'));
    console.log('second');
}
 
firstFunction();
secondFunction();


// ----------------------------------------------------------------------------------------------------------------------------

console.log("a");
setTimeOut(()=>{
conosle.log("b")
},0);
console.log("c")
// ----------------------------------------------------------------------------------------------------------------------------

let a = "Y"
let b = {
  c : "N"
}
let d = {}
console.log( a === "Y" ? d.c !== "Y"  : b.c  !== "N")
// ----------------------------------------------------------------------------------------------------------------------------

const map = new Map();
map.set("apple", 5);
map.set("banana", 10);
console.log(map.get("apple"));
console.log(map.get("banana"));
console.log(map.get("orange"));
map.set("apple", 7);
console.log(map.get("apple"));
// ----------------------------------------------------------------------------------------------------------------------------

(function() {
 let x = 10;
function changeX(value) {
  value = 20;
 }
changeX(x);
console.log(x);
})();
// ----------------------------------------------------------------------------------------------------------------------------

var a = 1;
function x(params) {
 console.log(a)
   if(a) var a = 9;
   console.log(a)
}
x(10)
// ----------------------------------------------------------------------------------------------------------------------------


const p  = new Promise((res,rej)=>{
    console.log('yehh')
    rej(1)
})
 
p.then((v)=>{
    console.log('resolved')
    return v;
},(e)=>{
    console.log('rejected')
    return e
}).then((v)=>{
    console.log('resolved')
},(e)=>{
    console.log('rejected')
})
p.then((v)=>{
    console.log('resolved')
    return v;
},(e)=>{
    console.log('rejected')
    return e
}).then((v)=>{
    console.log('resolved')
},(e)=>{
    console.log('rejected')
})
// ----------------------------------------------------------------------------------------------------------------------------



const promise = new Promise(res => res(2))
promise.then(v => {
	console.log(v);
  return v*2
}).then(v => {
	console.log(v);
  return v*2;
}).finally(v => {
	console.log(v);
  return v*2;
}).then(v => {
	console.log(v);
})
// ----------------------------------------------------------------------------------------------------------------------------


const a = {
    property1:123,
    property2:()=>{
      return "hello";
    },
    property3:"reactjs",
    property4: null,
    property5: undefined,
    property6:NaN,
    property1:456,
  }
  console.log(JSON.stringify(a));

// ----------------------------------------------------------------------------------------------------------------------------


const p1 = Promise.reject(0);
const p2 = new Promise(res => setTimeout(res, 1000, 'quick'));
const p3 = new Promise(res => setTimeout(res, 500, 'slow'));
const promises = [p1, p2, p3];
 
Promise.any(promises).then(v => console.log(v, '1'));
Promise.all(promises).then(v => console.log(v, '2'));
Promise.allSettled(promises).then(v => console.log(v, '3'));
Promise.race(promises).then(v => console.log(v, '4'));


// ----------------------------------------------------------------------------------------------------------------------------

var a = 5;
function x() {
	var a = 10;
  console.log(a);

}
x();
console.log(a);

// ----------------------------------------------------------------------------------------------------------------------------

for (var i = 0; i < 11; i++) {
  setTimeout(() => console.log(i), 1000);
}
console.log('Learn');

// ----------------------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------------

setTimeout(() => {
console.log(x)
console.log(y)
}, 3000)
var x = 10
let y = 12
// ----------------------------------------------------------------------------------------------------------------------------

var a = 10;
{
var a = 20;
console.log(a);
}
console.log(a)
// ----------------------------------------------------------------------------------------------------------------------------

sum(2)(3) & sum(2,3)
// ----------------------------------------------------------------------------------------------------------------------------

var a = 10

function one() {
    console.log(a)
}
 
function two() {
    var a = 20;
    one();
}
 
two()
// ----------------------------------------------------------------------------------------------------------------------------

let array1 = [1, 2];
 let array2 = [3, 4];
let a = array1.push(array2);

console.log(a);