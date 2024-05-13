function Node(value, next = null) {
  this.value = value;
  this.next = next;
}

function LinkedList() {
  this.head = null;

  this.add = function (value) {
    const node = new Node(value);
    if (this.head === null) {
      this.head = node;
    } else {
      let temp = this.head;
      while (temp.next) {
        temp = temp.next;
      }
      temp.next = node;
    }
    return this;
  };
}

const ll = new LinkedList();
ll.add(1);
ll.add(2);
ll.add(3);

console.log(ll.head);
