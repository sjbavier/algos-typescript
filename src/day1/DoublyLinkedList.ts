type Node<T> = {
    value: T;
    prev?: Node<T>;
    next?: Node<T>;
};

export default class DoublyLinkedList<T> {
    public length: number;
    private head?: Node<T>;
    private tail?: Node<T>;

    constructor() {
        this.length = 0;
        this.head = undefined;
        this.tail = undefined;
    }

    prepend(item: T): void {
        const node = { value: item } as Node<T>;
        // bookkeeping increase length of linked list
        this.length++;

        // if its the first item set it as the head
        if (!this.head) {
            this.head = this.tail = node;
            return;
        }

        // set the new node's next to the current head
        node.next = this.head;
        // set the previous of the current head to the new node
        this.head.prev = node;
        // finally set the head to the newly prepended node
        this.head = node;
    }
    insertAt(item: T, idx: number): void {
        // if idx is out of bounds, cant insert
        if (idx > this.length) {
            throw new Error("not within linked list");
            // if idx is at the end of the linked list
        } else if (idx === this.length) {
            this.append(item);
            return;
            // if idx is the beginning simply prepent
        } else if (idx === 0) {
            this.prepend(item);
            return;
        }

        this.length++;

        const curr = this.getAt(idx) as Node<T>;
        const node = { value: item } as Node<T>;

        // since we are inserting new node before the idx
        // the new node's next should be the curr we walked to
        node.next = curr;
        // the new node's previous should be the current's previous
        node.prev = curr.prev;

        // for typescript since it should exist
        if (curr.prev) {
            // current's previous next should be the inserted node
            curr.prev.next = node;
        }
    }
    append(item: T): void {
        this.length++;
        const node = { value: item } as Node<T>;
        ("");
        if (!this.tail) {
            // there is no linked list, new item is both head and tail
            this.head = this.tail = node;
            return;
        }

        // set the new node's previous to the current's tail
        node.prev = this.tail;
        // set the current's tail's next to the new node
        this.tail.next = node;
        // set the tail to the new node
        this.tail = node;
    }
    remove(item: T): T | undefined {
        let curr = this.head;
        // start at the head and walk
        for (let i = 0; curr && i < this.length; ++i) {
            //until matching the item
            if (curr.value === item) {
                break;
            }
            curr = curr.next;
        }

        // if there is no current there is no item to remove
        if (!curr) {
            return undefined;
        }

        return this.removeNode(curr);
    }
    get(idx: number): T | undefined {
        return this.getAt(idx)?.value;
    }
    removeAt(idx: number): T | undefined {
        const node = this.getAt(idx);
        if (!node) {
            return undefined;
        }
        return this.removeNode(node);
    }

    private removeNode(node: Node<T>): T | undefined {
        // bookkeeping
        this.length--;
        if (this.length === 0) {
            const out = this.head?.value;
            this.head = this.tail = undefined;
            return out;
        }

        // current's previous's next to point to the current's next
        if (node.prev) {
            node.prev.next = node.next;
        }
        // current's next's previous to point to the current's previous
        if (node.next) {
            node.next.prev = node.prev;
        }

        // if we are removing the head set the head to the next node
        if (node === this.head) {
            this.head = node.next;
        }

        // if we are removing the tail set the tail to the previous node
        if (node === this.tail) {
            this.tail = node.prev;
        }

        // bookkeeping to remove current's prev and next
        node.prev = node.next = undefined;
        return node.value;
    }
    private getAt(idx: number): Node<T> | undefined {
        // grab the current head
        let curr = this.head;
        // walk to the idx
        for (let i = 0; curr && i < idx; ++i) {
            curr = curr.next;
        }
        return curr;
    }
}
