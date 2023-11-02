import PropType from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { selectSnakeScore, selectPlayerName } from '../../redux/snakeSlice';
import { resetScore } from '../../redux/snakeSlice';
import { LeaderBoardApi } from '../../utils';

import './GameOver.scss';

const GameOver = ({ setGameStatusGame, setBoardKey, setLeaderBoardKey }) => {
    const dispatch = useDispatch();
    const playerName = useSelector(selectPlayerName);
    const snakeScore = useSelector(selectSnakeScore);

    const resetGame = () => {
        dispatch(resetScore());

        setBoardKey((prevKey) => prevKey + 1);
        setGameStatusGame();
    };

    const handleSaveRecord = () => {
        LeaderBoardApi.postLeaders({ player_name: playerName, player_score: snakeScore });
        setLeaderBoardKey((prev) => prev + 1);
    };

    return (
        <div className='gameOverWrapper'>
            <div className='info'>
                <h1>Game Over</h1>
                <button onClick={resetGame}>Reset</button>
                <button onClick={handleSaveRecord}>Save Record</button>
            </div>
        </div>
    );
};

GameOver.propTypes = {
    setGameStatusGame: PropType.func,
    setBoardKey: PropType.func,
    setLeaderBoardKey: PropType.func,
};

export default GameOver;
