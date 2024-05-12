function singleton(value) {
    let instance; 
    function getInstance () {
        console.log(instance);
        if(!instance) {
            instance = {
                 a: function() {console.log("a")}
            }
            return instance;
        } else {
            return instance;
        }
    }
    return getInstance;
}

const getInstance = singleton();
const a = getInstance();
console.log(a);
const b = getInstance();
console.log(a === b);
//-----------------------

function Singleton(value) {
    // Check if instance already exists
    if (Singleton.instance) {
        return Singleton.instance;
    }

    // Create instance
    this.value = value;

    // Store instance in static property
    Singleton.instance = this;
}

// Usage
const instance1 = new Singleton('Instance 1');
console.log(instance1.value); // Output: Instance 1

const instance2 = new Singleton('Instance 2');
console.log(instance2.value); // Output: Instance 1 (same as instance1)

console.log(instance1 === instance2); // Output: true (same instance)


class Singleton {

    static instance;
    constructor(value) {ñ
        if(!Singleton.instance) {
            this.value = value;
            Singleton.instance = this;
        }
    }
}