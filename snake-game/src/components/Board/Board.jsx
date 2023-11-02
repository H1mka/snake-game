import { useState, useEffect, useRef } from 'react';
import { gameSettings } from '../../constants/gameSettings';

import { useDispatch } from 'react-redux';
import { incrementScoreByAmount } from '../../redux/snakeSlice';

import { SnakeHead, SnakeBody } from '../../сlasses/SnakeClasses';
import { FoodCellsMap } from '../../constants/foodcellsMap';

import { randomFood, createBoard, getFirstNumber } from '../../utils';

import PropTypes from 'prop-types';

import './BoardStyles.scss';

/* GLOBAL VALUES */
const VALUES = {
    direction: 'LEFT',
    foodCell: { foodType: 'smFood', pos: 17, cost: 1 },
    scoreToIncrease: 0,
};

const handleKeyPress = (event, gameStatus, setGameStatusGame, setGameStatusPause) => {
    if (event.code === 'Space') {
        if (gameStatus === 'game') setGameStatusPause();
        else if (gameStatus === 'pause') setGameStatusGame();
    }

    if (gameStatus === 'pause') return;

    switch (event.code) {
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

const snakeEat = (snake, setSnake, foodCell, dispatch) => {
    const headPos = snake[0].pos;

    const spawnDirectionMap = {
        LEFT: 1,
        Right: -1,
        UP: gameSettings.boardSize,
        DOWN: -gameSettings.boardSize,
    };

    const bodySpawnDirection = spawnDirectionMap[VALUES.direction] || -1;

    if (headPos === foodCell.pos) {
        snake.push(
            new SnakeBody(
                snake[snake.length - 1].pos + bodySpawnDirection,
                snake[snake.length - 1].pos
            )
        );
        // dispatch(increaseGameTick());
        VALUES.scoreToIncrease += VALUES.foodCell.cost;
        dispatch(incrementScoreByAmount(VALUES.foodCell.cost));
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
        // для першої частини тіла, вказівник next береться з head
        if (i === 1) {
            snake[1].pos = snake[1].next;
            snake[1].next = snake[0].pos;
            continue;
        }

        // для інших частин тіла, вказівник next береться з попередньої частини
        snake[i].pos = snake[i].next;
        snake[i].next = snake[i - 1].pos;
    }
};

const move = (snake, setSnake, direction) => {
    const head = snake[0];
    const { boardSize } = gameSettings;

    const sqBoardSize = boardSize ** 2; // square board size
    const moveOffsets = {
        LEFT: -1,
        RIGHT: 1,
        DOWN: boardSize,
        UP: -boardSize,
    };

    const moveDirection = moveOffsets[direction];

    if (moveDirection) {
        const newPos = head.pos + moveDirection;

        /* ... HORIZONTAL SIDES MOVEMENT ... */
        // right vertical side
        if (head.pos === getFirstNumber(head.pos) * boardSize && newPos === head.pos + 1) {
            moveHeadAndBody(snake, head, -boardSize + 1);
            return;
        }

        // left vertical side
        if (head.pos === getFirstNumber(head.pos) * boardSize + 1 && newPos === head.pos - 1) {
            moveHeadAndBody(snake, head, boardSize - 1);
            return;
        }
        /* ... */

        /* VERTICAL SIDES MOVEMENT */
        if (newPos < 0 || newPos > sqBoardSize) {
            moveHeadAndBody(
                snake,
                head,
                moveDirection < 0
                    ? sqBoardSize - gameSettings.boardSize
                    : -sqBoardSize + gameSettings.boardSize
            );
        } else {
            // DEFAULT MOVEMENT
            moveHeadAndBody(snake, head, moveDirection);
        }
    }

    setSnake([...snake]);
};

const increaseGameSpeed = (gameTick, setGameTick) => {
    // Щоб gameTick не був нижче 100, нижче 100 не іграбельно
    if (gameTick - gameSettings.increaseValue < 100) return;

    if (VALUES.scoreToIncrease >= gameSettings.increaseEvery) {
        setGameTick((prev) => prev - gameSettings.increaseValue);
        VALUES.scoreToIncrease = 0;
    }
};

const Board = ({ gameStatus, setGameStatusEnd, setGameStatusGame, setGameStatusPause }) => {
    const { boardSize } = gameSettings;
    const [snake, setSnake] = useState([new SnakeHead(58)]);
    const [gameTick, setGameTick] = useState(gameSettings.gameTick);

    const board = createBoard(boardSize);

    const gameStatusRef = useRef(gameStatus);
    const dispatch = useDispatch();

    useEffect(() => {
        gameStatusRef.current = gameStatus;
    }, [gameStatus]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (gameStatusRef.current !== 'game') return;

            move(snake, setSnake, VALUES.direction);
            snakeEat(snake, setSnake, VALUES.foodCell, dispatch);
            snakeCollusion(snake, setGameStatusEnd);

            increaseGameSpeed(gameTick, setGameTick);
        }, gameTick);

        return () => {
            clearInterval(intervalId);
        };
    }, [gameTick]);

    useEffect(() => {
        const keyDownHandler = (event) =>
            handleKeyPress(event, gameStatusRef.current, setGameStatusGame, setGameStatusPause);

        document.addEventListener('keydown', keyDownHandler);

        return () => {
            document.removeEventListener('keydown', keyDownHandler);
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
                                    ? FoodCellsMap[VALUES.foodCell.foodType]
                                    : ''
                            }`}
                        >
                            {/* {cell} */}
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
    setGameStatusGame: PropTypes.func.isRequired,
};

export default Board;
