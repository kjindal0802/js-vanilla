function Node(value, next = null) {
  this.value = value;
  this.next = next;
}

const head = new Node(1);
const node1 = new Node(2);
const node2 = new Node(3);
const node3 = new Node(4);

head.next = node1;
node1.next = node2;
node2.next = node3;
console.log(head); 

node3.next = head;

let slow = head;
let fast = head;

function findCycleDetection() {
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) {
      return true;
    }
  }
  return false;
}

function reverseLinkedList() {}

console.log(findCycleDetection());
