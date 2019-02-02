function getPossDigits(x, y, puzzle) {
    const subSquare = { x: 3 * ~~(x / 3), y: 3 * ~~(y / 3) }
    const digits = new Array(9).fill().map((_, i) => i)

    for (let y = subSquare.y; y < subSquare.y + 3; y++) {
        for (let x = subSquare.x; x < subSquare.x + 3; x++) {
            if (!isNaN(puzzle[y][x])) digits[puzzle[y][x]] = undefined
        }
    }

    puzzle.forEach((row, i) =>
        row.forEach((v, j) => {
            if ((i === y || j === x) && puzzle[i][j]) digits[puzzle[i][j]] = undefined
        })
    )

    return digits.reduce((acc, v) => {
        if (!isNaN(v)) acc.push(v)
        return acc
    }, [])
}

function solve(puzzle) {
    const sortedQueue = []

    for (let y = 0; y < 9; y++) {
        for (let x = 0; x < 9; x++) {
            if (isNaN(puzzle[y][x])) {
                const currItem = { x, y, possDigits: getPossDigits(x, y, puzzle) }
                const queueIndex = currItem.possDigits.length
                let i = 0
                for (; i < sortedQueue.length; i++) if (queueIndex < sortedQueue[i].possDigits.length) break
                sortedQueue.splice(i, 0, currItem)
            }
        }
    }

    console.log(sortedQueue)
}

solve([
    [1, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 2]
])
