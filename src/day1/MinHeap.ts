export default class MinHeap {
    // parent ((i - 1)/2)
    // leftChild(2i + 1) rightChild (2i + 2)
    public length: number;
    private data: number[];

    constructor() {
        this.data = [];
        this.length = 0;
    }

    private heapifyUp(idx: number): void {
        if (idx === 0) {
            return;
        }
        const p = this.parent(idx);
        const parentV = this.data[p];
        const v = this.data[idx];

        // if parent value is greater than idx value
        if (parentV > v) {
            // swap parent and child
            this.data[idx] = parentV;
            this.data[p] = v;
            // recurse
            this.heapifyUp(p);
        }
    }

    private heapifyDown(idx: number): void {
        const lIdx = this.leftChild(idx);
        const rIdx = this.rightChild(idx);

        // don't go out of bounds
        if (idx >= this.length || lIdx >= this.length) {
            return;
        }

        const lV = this.data[lIdx];
        const rV = this.data[rIdx];
        const v = this.data[idx];

        //
        // find the minimum child
        //
        // right value is the smallest and we are greater than the smallest
        // swap and heapify down
        if (lV > rV && v > rV) {
            // swap idx value with right value
            this.data[idx] = rV;
            // swap right value with idx value
            this.data[rIdx] = v;
            // recurse
            this.heapifyDown(rIdx);
        } else if (rV > lV && v > lV) {
            // swap out left value
            this.data[idx] = lV;
            // swap right value with idx value
            this.data[lIdx] = v;
            // recurse
            this.heapifyDown(lIdx);
        }
    }

    private rightChild(idx: number): number {
        return idx * 2 + 2;
    }
    private leftChild(idx: number): number {
        return idx * 2 + 1;
    }
    insert(value: number): void {
        // append value using length
        this.data[this.length] = value;
        // then heapify up to bubble
        this.heapifyUp(this.length);
        // update the heap length property
        this.length++;
    }
    private parent(idx: number) {
        return Math.floor((idx - 1) / 2);
    }
    delete(): number {
        // get the value out of the head of the min heap
        // take the last element in the array and put it in the heads position
        // then heapify down
        if (this.length === 0) {
            // nothing to delete
            return -1;
        }
        const out = this.data[0];
        this.length--;
        if (this.length === 0) {
            // only one element in heap
            this.data = [];
            return out;
        }
        this.data[0] = this.data[this.length];
        this.heapifyDown(0);
        return out;
    }
}
