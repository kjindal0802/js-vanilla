function createLinkedList() {
  const list = {
    head: null,
    size: 0,
    add: function (value) {
      const node = new Node(value);
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
    },
    getSize: function () {
      return this.size;
    },
  };

  return list;
}

function Node(value, next = null) {
  this.value = value;
  this.next = next;
}

// Usage:
const ll = createLinkedList();
ll.add(1);
ll.add(2);
ll.add(3);
console.log(ll); // Output: { head: { value: 1, next: { value: 2, next: { value: 3, next: null } } }, size: 3 }
console.log(ll.getSize()); // Output: 3
