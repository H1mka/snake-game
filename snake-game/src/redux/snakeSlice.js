import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    score: 0,
    playerName: 'name unknown',
};

const snakeSlice = createSlice({
    name: 'snake',
    initialState,
    reducers: {
        incrementScoreByAmount: (state, action) => {
            state.score += action.payload;
        },

        resetScore: (state) => {
            state.score = 0;
        },

        setPlayerName: (state, action) => {
            state.playerName = action.payload;
        },
    },
});

export const selectSnakeScore = (state) => state.snake.score;
export const selectPlayerName = (state) => state.snake.playerName;

export const { incrementScoreByAmount, resetScore, setPlayerName } = snakeSlice.actions;

export default snakeSlice.reducer;
