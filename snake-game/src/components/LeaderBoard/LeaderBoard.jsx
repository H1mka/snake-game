import { useState, useEffect } from 'react';
import { LeaderBoardApi } from '../../utils';

import './LeaderBoard.scss';

const LeaderBoard = () => {
    const [leaders, setLeaders] = useState([]);

    useEffect(() => {
        LeaderBoardApi.getLeaders().then((response) => setLeaders(response.data));
    }, []);
    return (
        <div className='rightSideBar'>
            <div className='leaderBoard'>
                <div className='boardHeader'>
                    <p>Player name</p>
                    <p>Score</p>
                </div>
                {leaders.map((leader, index) => (
                    <div key={leader.id} className='boardBlock'>
                        <p>
                            {index + 1}. {leader.player_name}
                        </p>
                        <p className='score'>{leader.player_score}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LeaderBoard;
