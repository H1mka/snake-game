import { useSelector } from 'react-redux';
import { selectSnakeScore } from '../../redux/snakeSlice';

const Score = () => {
    const score = useSelector(selectSnakeScore);
    return <div style={{ fontSize: '46px', fontWeight: 500 }}>Score: {score}</div>;
};

export default Score;
