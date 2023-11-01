import { useState } from 'react';
import { Board, GameOver, Menu, Overlay, LeftSideBar } from './components';

import './App.css';

function App() {
    const [gameStatus, setGameStatus] = useState('menu'); // menu | game | pause | gameOver

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
            <LeftSideBar />
            <Board
                gameStatus={gameStatus}
                setGameStatusEnd={setGameStatusEnd}
                setGameStatusGame={setGameStatusGame}
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
            ) : gameStatus === 'pause' ? (
                <Overlay>
                    <img src='src/assets/images/pauseImg.png' />
                </Overlay>
            ) : (
                ''
            )}
            <LeftSideBar />
        </>
    );
}

export default App;
