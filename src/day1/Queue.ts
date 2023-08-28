// data structure is a singly linked list

type Node<T> = {
    value: T;
    next?: Node<T>;
};

export default class Queue<T> {
    public length: number;
    private head?: Node<T>;
    private tail?: Node<T>;

    constructor() {
        this.head = this.tail = undefined;
        this.length = 0;
    }

    enqueue(item: T): void {
        // create new Node
        const node = { value: item } as Node<T>;

        // increment the length of the linked list
        this.length++;

        // if there is no tail there is no linked list so create one
        if (!this.tail) {
            // the tail the head and the node are one in the same
            // on a new linked list (singly)
            this.tail = this.head = node;
            return;
        }

        // add the new node to the next of the current tail
        this.tail.next = node;
        // and then set the tail to point to the new node
        this.tail = node;
    }
    deque(): T | undefined {
        // if there is no head
        if (!this.head) {
            return undefined;
        }

        // decrement length of linked list
        this.length--;

        // grab the current head
        const head = this.head;
        // set the head to the next node
        this.head = this.head.next;
        // free
        head.next = undefined;
        // if there is no length free the tail
        if (this.length === 0) {
            this.tail = undefined;
        }

        // return the value of the head
        return head.value;
    }
    peek(): T | undefined {
        return this.head?.value;
    }
}
