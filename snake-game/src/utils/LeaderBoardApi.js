import axios from 'axios';

export const LeaderBoardApi = {
    getLeaders() {
        return axios.get('https://snake-server-production-8232.up.railway.app/api/leaderboard');
    },

    postLeaders(body) {
        axios.post('https://snake-server-production-8232.up.railway.app/api/leaderboard', body);
    },
};
