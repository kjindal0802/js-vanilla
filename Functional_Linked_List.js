function createLinkedList() {
    this.head = null;
    this.size = 0;

    this.add = function(value) {
        const node = new createNode(value);
        if (this.head === null) {
            this.head = node;
        } else {
            let current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = node;
        }
        this.size++;
    };

    this.getSize = function() {
        return this.size;
    };

    return { add: this.add, getSize: this.getSize };
}

function createNode(value, next = null) {
    this.value = value;
    this.next = next;
}

// Usage:
const ll = createLinkedList();
ll.add(1);
ll.add(2);
ll.add(3);
console.log(ll.getSize()); // Output: 3
