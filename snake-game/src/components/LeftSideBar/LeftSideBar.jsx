import Score from '../Score/Score';
import { useSelector } from 'react-redux';
import { selectPlayerName } from '../../redux/snakeSlice';

import './LeftSideBar.scss';

const LeftSideBar = () => {
    const playerName = useSelector(selectPlayerName);
    return (
        <div className='leftSideBar'>
            <Score />
            <div className='playerName'>{playerName}</div>
            <div className='foodInfo'>
                <div className='foodBlock'>
                    <img src='src\assets\images\apple2.png' alt='apple' />
                    <p> – 1 point</p>
                </div>
                <div className='foodBlock'>
                    <img src='src\assets\images\pineapple2.png' alt='apple' />
                    <p> – 5 points</p>
                </div>
                <div className='foodBlock'>
                    <img src='src\assets\images\watermelon.png' alt='apple' />
                    <p> – 10 points</p>
                </div>
            </div>
            <div className='controlInfo'>
                <p>
                    <span className='space'>Space</span> – pause
                </p>
            </div>
        </div>
    );
};

export default LeftSideBar;
