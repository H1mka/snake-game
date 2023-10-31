import { useState, useEffect } from 'react';
import { Board, GameOver, Menu, Overlay } from './components';

import './App.css';

function App() {
    const [gameStatus, setGameStatus] = useState('menu'); // menu | game | pause | gameOver

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
