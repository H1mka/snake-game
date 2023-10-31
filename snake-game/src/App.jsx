import { useState, useEffect } from 'react';
import { Board, GameOver, Menu, Overlay } from './components';
import { useSelector } from 'react-redux';
import { selectSnakeScore } from './redux/snakeSlice';

import './App.css';

function App() {
    const [gameStatus, setGameStatus] = useState('game'); // menu | game | pause | gameOver

    const snakeScore = useSelector(selectSnakeScore);
    console.log(snakeScore);
    // useEffect(() => {
    //     console.log(gameStatus);
    // }, [gameStatus]);

    const setGameStatusGame = () => {
        setGameStatus('game');
    };

    const setGameStatusPause = () => {
        setGameStatus('pause');
    };

    const setGameStatusEnd = () => {
        setGameStatus('gameOver');
        // console.log('app', gameStatus);
    };

    return (
        <>
            <Board
                gameStatus={gameStatus}
                setGameStatusEnd={setGameStatusEnd}
                setGameStatusPause={setGameStatusPause}
            />
            {/* {gameStatus === 'menu' ? (
                <Overlay>
                    <Menu setGameStatusGame={setGameStatusGame} />
                </Overlay>
            ) : gameStatus === 'gameOver' ? (
                <Overlay>
                    <GameOver setGameStatusGame={setGameStatusGame} />
                </Overlay>
            ) : (
                ''
            )} */}
        </>
    );
}

export default App;
