import { useState, useEffect, useRef } from 'react';
import { gameSettings } from '../../constants/gameSettings';
import { randomFood } from '../../utils/randomFood';
import PropTypes from 'prop-types';

import './BoardStyles.scss';

/* GLOBAL VALUES */
const VALUES = {
    direction: 'LEFT',
    foodCell: { type: 'small', pos: 17 },
};

const createBoard = (boardSize = 10) => {
    let counter = 1;

    const boardRes = [];
    for (let i = 0; i < boardSize; i++) {
        boardRes[i] = new Array(boardSize);
        for (let j = 0; j < boardSize; j++) {
            boardRes[i][j] = counter;
            counter++;
        }
    }
    return boardRes;
};

class SnakeHead {
    constructor(pos) {
        this.pos = pos;
    }
}

class SnakeBody {
    constructor(pos, next) {
        this.pos = pos;
        this.next = next;
    }
}

const handleKeyPress = (event) => {
    switch (event.key) {
        case 'ArrowUp':
            if (VALUES.direction === 'DOWN') break;

            VALUES.direction = 'UP';
            break;
        case 'ArrowDown':
            if (VALUES.direction === 'UP') break;

            VALUES.direction = 'DOWN';
            break;
        case 'ArrowLeft':
            if (VALUES.direction === 'RIGHT') break;

            VALUES.direction = 'LEFT';
            break;
        case 'ArrowRight':
            if (VALUES.direction === 'LEFT') break;

            VALUES.direction = 'RIGHT';
            break;
        default:
            break;
    }
};

const snakeEat = (snake, setSnake, foodCell) => {
    const headPos = snake[0].pos;
    let foodSpawnDirection = -1;

    switch (VALUES.direction) {
        case 'LEFT':
            foodSpawnDirection = 1;
            break;
        case 'RIGHT':
            foodSpawnDirection = -1;
            break;
        case 'UP':
            foodSpawnDirection = 10;
            break;
        case 'DOWN':
            foodSpawnDirection = -10;
            break;
        default:
            break;
    }

    if (headPos === foodCell.pos) {
        snake.push(
            new SnakeBody(
                snake[snake.length - 1].pos + foodSpawnDirection,
                snake[snake.length - 1].pos
            )
        );

        VALUES.foodCell = randomFood(snake); // передаю змію, щоб виключити спавн їжі на клітках змії
    }
    setSnake([...snake]);
};

const snakeCollusion = (snake = Array.prototype, setGameStatusEnd) => {
    const [snakeHead, ...snakeBody] = snake; // видаляємо голову змії, голова не можем в себе врізатись
    const snakeCells = snakeBody.map((part) => part.pos);

    if (snakeCells.includes(snakeHead.pos)) {
        setGameStatusEnd();
    }
};

const moveHeadAndBody = (snake, head, moveRange) => {
    head.pos += moveRange;
    for (let i = 1; i < snake.length; i++) {
        if (i === 1) {
            snake[1].pos = snake[1].next;
            snake[1].next = snake[0].pos;
            continue;
        }
        snake[i].pos = snake[i].next;
        snake[i].next = snake[i - 1].pos;
    }
    return snake;
};

const move = (snake, setSnake, direction) => {
    const head = snake[0];
    const sqBoardSize = gameSettings.boardSize ** 2; // square board size
    console.log(head.pos);
    switch (direction) {
        case 'LEFT':
            if (head.pos < 1) moveHeadAndBody(snake, head, sqBoardSize);
            else moveHeadAndBody(snake, head, -1);
            break;

        case 'RIGHT':
            if (head.pos > sqBoardSize) moveHeadAndBody(snake, head, -sqBoardSize);
            else moveHeadAndBody(snake, head, 1);
            break;

        case 'DOWN':
            if (head.pos > sqBoardSize) moveHeadAndBody(snake, head, -sqBoardSize);
            else moveHeadAndBody(snake, head, 10);
            break;

        case 'UP':
            if (head.pos < 0) moveHeadAndBody(snake, head, sqBoardSize);
            else moveHeadAndBody(snake, head, -10);
            break;
        default:
            break;
    }
    setSnake([...snake]);
};

const Board = ({ gameStatus, setGameStatusEnd, setGameStatusPause }) => {
    const { boardSize } = gameSettings;
    const [board, setBoard] = useState(createBoard(boardSize));
    const [snake, setSnake] = useState([new SnakeHead(58)]);
    const gameStatusRef = useRef(gameStatus);

    useEffect(() => {
        gameStatusRef.current = gameStatus;
    }, [gameStatus]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (gameStatusRef.current !== 'game') return;

            move(snake, setSnake, VALUES.direction);
            snakeEat(snake, setSnake, VALUES.foodCell);
            snakeCollusion(snake, setGameStatusEnd);
        }, 400);

        document.addEventListener('keydown', handleKeyPress);

        return () => {
            clearInterval(intervalId);
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, []);

    return (
        <div className='board'>
            {board.map((row, rowIndex) => (
                <div key={rowIndex} className='row'>
                    {row.map((cell, cellIndex) => (
                        <div
                            key={cellIndex}
                            className={`cell ${snake[0].pos === cell ? 'snakeHead-cell' : ''} ${
                                snake.some((part) => part.pos === cell)
                                    ? 'snake-cell'
                                    : cell === VALUES.foodCell.pos
                                    ? 'food-cell'
                                    : ''
                            }`}
                        >
                            {cell}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

Board.propTypes = {
    gameStatus: PropTypes.string.isRequired,
    setGameStatusEnd: PropTypes.func.isRequired,
    setGameStatusPause: PropTypes.func.isRequired,
};

export default Board;
