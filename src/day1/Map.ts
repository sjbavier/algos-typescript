// Hash Maps
// typical implementation defines an array of slots
// takes in a key, hashes it into a number modulo's by the length of the array of slots
// pushing for a load factor of 0.7 which is a ratio of 7 to 10 slots filled
// on saving, if there are collisions each slot contains an array(linked list) itself of [{key, value}] pairs
// on lookup, hash the key, modulo by length of array of slots then walk each item in the array looking for matching keys
// on resizing when load factor goes up or down, we can walk the slots and rehash and save each item in the datastructure
export default class Map<T extends string | number, V> {
    constructor() {}

    get(key: T): V | undefined {}
    set(key: T, value: V): void {}
    delete(key: T): V | undefined {}
    size(): number {}
}
