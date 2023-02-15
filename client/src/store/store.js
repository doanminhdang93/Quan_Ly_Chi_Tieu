import {configureStore} from '@reduxjs/toolkit';
import { expenseSlice } from './reducer';
import {apiSlide} from './apiSlide';

export const store = configureStore({
    reducer:{
        expense: expenseSlice,
        [apiSlide.reducerPath]: apiSlide.reducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlide.middleware)
})