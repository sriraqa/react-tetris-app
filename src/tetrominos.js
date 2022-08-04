//Tetromino objects
export const TETROMINOS = {
    0: { shape: [[0]], color: '0, 0, 0' },
    I: {
        shape: [
                    [0, 'I', 0, 0],
                    [0, 'I', 0, 0],
                    [0, 'I', 0, 0],
                    [0, 'I', 0, 0]
               ],
        color: '154, 231, 171',
    },
    J: {
        shape: [
                    [0, 'J', 0],
                    [0, 'J', 0],
                    ['J', 'J', 0]
               ],
        color: '77, 166, 178',
    },
    L: {
        shape: [
                    [0, 'L', 0],
                    [0, 'L', 0],
                    [0, 'L', 'L']
               ],
        color: '239, 195, 108',
    },
    O: {
        shape: [
                    ['O', 'O'],
                    ['O', 'O']
               ],
        color: '255, 241, 118',
    },
    S: {
        shape: [
                    [0, 'S', 'S'],
                    ['S', 'S', 0],
                    [0, 0, 0]
               ],
        color: '140, 172, 50',
    },
    T: {
        shape: [
                    [0, 0, 0],
                    ['T', 'T', 'T'],
                    [0, 'T', 0]
               ],
        color: '246, 179, 228',
    },
    Z: {
        shape: [
                    ['Z', 'Z', 0],
                    [0, 'Z', 'Z'],
                    [0, 0, 0]
               ],
        color: '238, 127, 134',
    }
}

export const randomTetromino = () => {
    const tetrominos = 'IJLOSTZ';
    const randTetromino = 
        tetrominos[Math.floor(Math.random() * tetrominos.length)];
    return TETROMINOS[randTetromino]; //returns a random letter as object above
}