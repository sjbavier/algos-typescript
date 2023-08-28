type Node<T> = {
    value: T;
    prev?: Node<T>;
};

export default class Stack<T> {
    public length: number;
    private head?: Node<T>;

    constructor() {
        this.head = undefined;
        this.length = 0;
    }

    push(item: T): void {
        // create the node
        const node = { value: item } as Node<T>;

        // increment the length of the stack
        this.length++;

        // if no head, first entry, set the node as the head
        if (!this.head) {
            this.head = node;
            return;
        }

        // set the current head as the previous of the node
        // we are adding onto the stack
        node.prev = this.head;
        // then we set the head to the node we pushed onto the stack
        this.head = node;
    }
    pop(): T | undefined {
        // to decrement but not go into negative numbers
        this.length = Math.max(0, this.length - 1);

        // if we've removed the only item, do some house cleaning
        if (this.length === 0) {
            // grab and return the head value
            const head = this.head;
            this.head = undefined;
            return head?.value;
        }

        // optional depending on language freeing -- skipped --

        // grab the current head value
        const head = this.head as Node<T>;
        // set the head to the current's head previous node
        this.head = head.prev;

        // return out the popped value
        return head.value;
    }
    peek(): T | undefined {
        return this.head?.value;
    }
}
