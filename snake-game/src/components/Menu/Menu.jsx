import PropType from 'prop-types';

import './Menu.scss';

const Menu = ({ setGameStatusGame }) => {
    return (
        <div className='menuWrapper'>
            <div className='menu'>
                <label htmlFor='playerName'>Нік гравця</label>
                <input id='playerName' name='playerName' />
                <button onClick={setGameStatusGame}>Почати</button>
            </div>
        </div>
    );
};

Menu.propTypes = {
    setGameStatusGame: PropType.func.isRequired,
};

export default Menu;
