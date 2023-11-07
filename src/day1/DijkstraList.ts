function hasUnvisited(seen: boolean[], dists: number[]): boolean {
    return seen.some((s, i) => !s && dists[i] < Infinity); // since we fill dists with Infinities
}
function getLowestUnvisited(seen: boolean[], dists: number[]): number {
    let idx = -1;
    let lowestDistance = Infinity;

    for (let i = 0; i < seen.length; ++i) {
        if (seen[i]) {
            continue;
        }

        if (lowestDistance > dists[i]) {
            // then we've found a shorter distance
            lowestDistance = dists[i]; // set the lowest distance to the current
            idx = i;
        }
    }
    return idx; // return out the lowest index
}
export default function dijkstra_list(
    source: number,
    sink: number,
    arr: WeightedAdjacencyList,
): number[] {
    const seen = new Array(arr.length).fill(false);
    const prev = new Array(arr.length).fill(-1);
    const dists = new Array(arr.length).fill(Infinity);

    dists[source] = 0; // at the source/start the distance is 0

    while (hasUnvisited(seen, dists)) {
        const curr = getLowestUnvisited(seen, dists);
        seen[curr] = true; // housekeeping now we've seen this

        const adjs = arr[curr];
        for (let i = 0; i < adjs.length; ++i) {
            // go through all the adjacency edges
            const edge = adjs[i];
            if (seen[edge.to]) {
                // if we've already seen the edge to node, continue
                continue;
            }

            const dist = dists[curr] + edge.weight; // calculate the distance + the edge weight to get the distance to the node from the one we are at
            if (dist < dist[edge.to]) {
                // if this distance is less than the known distance of the edge
                dists[edge.to] = dist; // new smaller dist
                prev[edge.to] = curr; // previous has a parent of current
            }
        }
    }

    const out: number[] = [];
    let curr = sink;

    while (prev[curr] !== -1) {
        out.push(curr);
        curr = prev[curr];
    }

    out.push(source);
    return out.reverse();
}
