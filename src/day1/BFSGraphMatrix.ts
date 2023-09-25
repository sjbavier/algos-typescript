export default function bfs(
    graph: WeightedAdjacencyMatrix,
    source: number,
    needle: number,
): number[] | null {
    // prev array = [-1, -1 ...]
    // seen array = [true, false, ...] true for source
    // q = [0] queue

    const seen = new Array(graph.length).fill(false);
    const prev = new Array(graph.length).fill(-1);

    seen[source] = true; // add source to seen array
    const q: number[] = [source]; // add source to queue

    do {
        const curr = q.shift() as number;
        if (curr === needle) {
            break;
        }
        const adjs = graph[curr];
        for (let i = 0; i < adjs.length; ++i) {
            if (adjs[i] === 0) {
                continue;
            }
            if (seen[i]) {
                continue;
            }
            seen[i] = true;
            prev[i] = curr; // to derive how to walk backwards
            q.push(i);
        }
        seen[curr] = true;
    } while (q.length);

    if (prev[needle] === -1) {
        return null;
    }

    // build it backwards
    let curr = needle;
    const out: number[] = [];
    while (prev[curr] !== -1) {
        out.push(curr);
        curr = prev[curr];
    }

    return [source].concat(out.reverse());
}
