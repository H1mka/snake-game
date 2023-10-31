import { useState } from 'react';
import { Board, GameOver, Menu, Overlay } from './components';
import { useSelector } from 'react-redux';
import { selectSnakeScore } from './redux/snakeSlice';

import './App.css';

function App() {
    const [gameStatus, setGameStatus] = useState('menu'); // menu | game | pause | gameOver

    const snakeScore = useSelector(selectSnakeScore);
    console.log(snakeScore);

    const setGameStatusGame = () => {
        setGameStatus('game');
    };

    const setGameStatusPause = () => {
        setGameStatus('pause');
    };

    const setGameStatusEnd = () => {
        setGameStatus('gameOver');
    };

    return (
        <>
            <Board
                gameStatus={gameStatus}
                setGameStatusEnd={setGameStatusEnd}
                setGameStatusPause={setGameStatusPause}
            />
            {gameStatus === 'menu' ? (
                <Overlay>
                    <Menu setGameStatusGame={setGameStatusGame} />
                </Overlay>
            ) : gameStatus === 'gameOver' ? (
                <Overlay>
                    <GameOver setGameStatusGame={setGameStatusGame} />
                </Overlay>
            ) : (
                ''
            )}
        </>
    );
}

export default App;
