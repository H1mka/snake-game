import { useState } from 'react';
import { Board, GameOver, Menu, Overlay, LeftSideBar, LeaderBoard } from './components';

import './App.css';

function App() {
    const [gameStatus, setGameStatus] = useState('menu'); // menu | game | pause | gameOver
    const [boardKey, setBoardKey] = useState(0); // Щоб перендирити компонент після закінчення гри
    const [leaderBoardKey, setLeaderBoardKey] = useState(100); // Щоб перендирити компонент після додавання рекорду

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
                key={boardKey}
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
                    <GameOver
                        setGameStatusGame={setGameStatusGame}
                        setBoardKey={setBoardKey}
                        setLeaderBoardKey={setLeaderBoardKey}
                    />
                </Overlay>
            ) : gameStatus === 'pause' ? (
                <Overlay>
                    <img src='src/assets/images/pauseImg.png' />
                </Overlay>
            ) : (
                ''
            )}
            <LeaderBoard key={leaderBoardKey} />
        </>
    );
}

export default App;
