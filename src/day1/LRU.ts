type Node<T> = {
    value: T;
    next?: Node<T>;
    prev?: Node<T>;
};
function createNode<V>(value: V): Node<V> {
    return { value };
}
// Least Recent Update Cache (LRU Cache)
// At its core it is a doubly linked list and Hash Map
// nodes of the linked list are the value of a Hash Map for constant time lookup
// items towards the head are recent and tail is least recent
// on lookup the node is updated to the head of the linked list
// there is a capacity for the number of nodes based on the Hash Map
// using the tail for constant lookup the items can be removed on resize
export default class LRU<K, V> {
    private length: number;
    private head?: Node<V>;
    private tail?: Node<V>;

    private lookup: Map<K, Node<V>>; // from a key (K) to a node
    private reverseLookup: Map<Node<V>, K>; // from a node to a key
    constructor(private capacity: number) {
        this.length = 0;
        this.head = this.tail = undefined;
        this.lookup = new Map<K, Node<V>>();
        this.reverseLookup = new Map<Node<V>, K>();
    }

    update(key: K, value: V): void {
        // does it exist
        let node = this.lookup.get(key);
        if (!node) {
            node = createNode(value);
            this.length++;
            this.prepend(node);
            this.trimCache();

            this.lookup.set(key, node);
            this.reverseLookup.set(node, key);
        } else {
            this.detach(node);
            this.prepend(node);
            node.value = value;
        }
        // we are in this case updating the value
        // there are caches where we are not changing the value if it exists and we could reuse the get() method
        // -- check capcity and evict if over
        // if it does exist we need to update the value and move to front of list
    }
    get(key: K): V | undefined {
        // check cache for existence
        const node = this.lookup.get(key);
        if (!node) {
            return undefined;
        }
        // update the value we found and move to the front
        this.detach(node);
        this.prepend(node);
        // return out the value found or undefined if does not exist
        return node.value;
    }
    private detach(node: Node<V>) {
        // doubly linked list maneuvering
        if (node.prev) {
            node.prev.next = node.next;
        }
        if (node.next) {
            node.next.prev = node.prev;
        }

        if (this.head === node) {
            // you've popped off the head
            this.head = this.head.next;
        }

        if (this.tail === node) {
            // you've chopped off the tail
            this.tail = this.tail.prev;
        }

        node.next = undefined;
        node.prev = undefined;
    }

    private prepend(node: Node<V>) {
        if (!this.head) {
            // no head and no tail implied ? give it one
            this.head = this.tail = node;
            return;
        }
        node.next = this.head;
        this.head.prev = node;
        this.head = node;
    }
    private trimCache(): void {
        if (this.length <= this.capacity) {
            return;
        }
        const tail = this.tail as Node<V>;
        this.detach(this.tail as Node<V>);
        const key = this.reverseLookup.get(tail) as K;
        this.lookup.delete(key);
        this.reverseLookup.delete(tail);
        this.length--;
    }
}
