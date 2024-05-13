function Node(value, next = null) {
    this.value = value;
    this.next = next;
}

function LinkedList() {
    let head = null;
    function add(value) {
        const node = new Node(value);
        if(head === null) {
            head = node;
        } else {
            let temp = head;
            while(temp.next) {
                temp = temp.next;
            }
            temp.next = node;
        }
    }
    return {
        add,
        getHead:() => head
    }
    
}


const ll = LinkedList();
ll.add(1);
ll.add(2);
ll.add(3);

console.log(ll.getHead());

