const createBoard = (boardSize = 10) => {
    let counter = 1;

    const boardResult = [];
    for (let i = 0; i < boardSize; i++) {
        boardResult[i] = new Array(boardSize);
        for (let j = 0; j < boardSize; j++) {
            boardResult[i][j] = counter;
            counter++;
        }
    }
    return boardResult;
};

export { createBoard };
