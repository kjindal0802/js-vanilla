// sum(1,2,3,4)(5)(6,7)()
// sum(1)(2)(3)()
// sum(1)()
// sum(1)(2,3)()

function sum(...args) {
    let totalSum = args.reduce((acc, arr) => acc + arr, 0);
    return function insideSum(...inargs) {
        if(inargs.length === 0) {
            return totalSum;
        } else {
            let temp = inargs.reduce((acc, arr) => acc + arr, 0);
            totalSum = totalSum  + temp;
            return insideSum;
        }
    }
}
console.log(sum(1,2,3,4)(5,6)(7,8)());