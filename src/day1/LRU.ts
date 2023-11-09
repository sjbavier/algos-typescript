// Least Recent Update Cache (LRU Cache)
// At its core it is a doubly linked list and Hash Map
// nodes of the linked list are the value of a Hash Map for constant time lookup
// items towards the head are recent and tail is least recent
// on lookup the node is updated to the head of the linked list
// there is a capacity for the number of nodes based on the Hash Map
// using the tail for constant lookup the items can be removed on resize
export default class LRU<K, V> {
    private length: number;

    constructor() {}

    update(key: K, value: V): void {}
    get(key: K): V | undefined {}
}
