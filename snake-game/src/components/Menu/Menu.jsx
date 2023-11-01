import PropType from 'prop-types';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPlayerName } from '../../redux/snakeSlice';

import './Menu.scss';

const Menu = ({ setGameStatusGame }) => {
    const [inputName, setInputName] = useState('');
    const dispatch = useDispatch();

    const handleNameChange = (event) => {
        setInputName(event.target.value);
        if (event.target.value.length < 4 || event.target.value.length > 12)
            event.target.classList.add('error');
        else event.target.classList.remove('error');
    };

    const submitName = () => {
        if (inputName < 4 || inputName > 20) return;

        dispatch(setPlayerName(inputName));
        setGameStatusGame();
    };

    return (
        <div className='menuWrapper'>
            <div className='menu'>
                <label htmlFor='playerName'>Player name</label>
                <input
                    id='playerName'
                    name='playerName'
                    maxLength={12}
                    onChange={handleNameChange}
                />
                <button onClick={submitName}>Play</button>
            </div>
        </div>
    );
};

Menu.propTypes = {
    setGameStatusGame: PropType.func.isRequired,
};

export default Menu;
