import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    score: 0,
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
    },
});

export const selectSnakeScore = (state) => state.snake.score;

export const { incrementScoreByAmount, resetScore } = snakeSlice.actions;

export default snakeSlice.reducer;
