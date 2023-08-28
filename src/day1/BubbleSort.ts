// (n+1)n/2
// ___________
// Runtime n^2
export default function bubble_sort(arr: number[]): void {
    // sort in place algorithm
    for (let i = 0; i < arr.length; ++i) {
        // for each iteration the next largest value is pushed into position
        //  -i is because each iteration should be n - 1 for array position
        // and -i for decrement
        for (let j = 0; j < arr.length - 1 - i; ++j) {
            // compare j and j + 1, if j is greater than swap places
            if (arr[j] > arr[j + 1]) {
                const tmp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = tmp;
            }
        }
    }
}
