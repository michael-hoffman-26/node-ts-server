const mapInput: number[][] = [
    [1, 1, 0],
    [0, 1, 0],
    [1, 0, 1],
]

const mapInput2: number[][] = [
    [1, 1, 0, 1],
    [0, 1, 0, 1],
    [1, 1, 0, 1],
    [0, 0, 0, 1],
]

interface ContainedZone {
    area: number
    permiter?: number
}

const EMPTY_CELL = 0
const RADIO_ACTIVE_CELL = 1
const VISITED_CELL = 2

function calcDFSArea(i: number, j: number, map: number[][]): number {
    if (i < 0 || j < 0 || i >= map.length || j >= map[i].length) {
        return 0; // Return 0 for non-radioactive cells or out-of-bounds
    }

    if (map[i][j] !== RADIO_ACTIVE_CELL) {
        return 0;
    }

    // Mark this cell as visited and count it
    let cellsCounter = 1;
    map[i][j] = VISITED_CELL;

    cellsCounter += calcDFSArea(i - 1, j, map); // Up
    cellsCounter += calcDFSArea(i + 1, j, map); // Down
    cellsCounter += calcDFSArea(i, j + 1, map); // Right
    cellsCounter += calcDFSArea(i, j - 1, map); // Left

    return cellsCounter;
}




const calculateRadioActive = (map: number[][]): ContainedZone[] => {
    const areas: number[] = []
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[i].length; j++) {
            if (map[i][j] === RADIO_ACTIVE_CELL) {
                areas.push(calcDFSArea(i, j, map))
            }
        }
    }

    console.log('number of contained zonscontaminated zones is', areas.length);

    return areas.map(area => {
        return {
            area: area * 100
        }
    })
}


// console.log(calculateRadioActive(mapInput));
// console.log(calculateRadioActive(mapInput2));
const result = calculateRadioActive(mapInput2);

console.log(result);
