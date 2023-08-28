export default function bs_list(haystack: number[], needle: number): boolean {
    let lo = 0;
    let hi = haystack.length;
    do {
        // split the array
        const m = Math.floor(lo + (hi - lo) / 2);
        const v = haystack[m];
        // check the middle for the needle
        if (v === needle) {
            return true;
            // if the middle guess is greater than the needle
        } else if (v > needle) {
            // set the middle guess as the hi
            hi = m;
        } else {
            // if the middle guess is less than the needle
            // set the lo to the middle guess
            // + 1, it does not need to get checked again
            lo = m + 1;
        }
    } while (lo < hi);
    return false;
}
