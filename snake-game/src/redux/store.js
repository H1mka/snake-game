import { configureStore } from '@reduxjs/toolkit';
import snakeReducer from './snakeSlice';

export default configureStore({
    reducer: {
        snake: snakeReducer,
    },
});
