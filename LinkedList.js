class Node {
  constructor(value, next = null) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList {

  constructor() {
    this.head = null;
    this.size = 0;
  }

  add(value) {
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
  }

  print() {
    const pointer = this.head;
    while(pointer.next) {
      console.log(pointer.value);
      pointer = pointer.next;
    }
  }


  getSize() {
    return this.size;
  }
}

const linkedList = new LinkedList();
linkedList.add(1);
linkedList.add(2);
linkedList.add(3);
linkedList.add(4);

linkedList.print()

console.log(linkedList);

