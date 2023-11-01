import axios from 'axios';

export const LeaderBoardApi = {
    getLeaders() {
        return axios.get('http://localhost:8080/api/leaderBoard');
    },

    postLeaders(body) {
        axios.post('http://localhost:8080/api/leaderBoard', body);
    },
};
