import PropType from 'prop-types';

import './GameOver.scss';

const GameOver = ({ setGameStatusGame }) => {
    return (
        <div className='gameOverWrapper'>
            <div className='info'>
                <h1>GameOver</h1>
                <h2>Score: 0</h2>
                <button onClick={setGameStatusGame}>Reset</button>
            </div>
        </div>
    );
};

GameOver.propTypes = {
    setGameStatusGame: PropType.func,
};

export default GameOver;
