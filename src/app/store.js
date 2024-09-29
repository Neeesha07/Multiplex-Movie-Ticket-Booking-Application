// store.js
import { configureStore } from '@reduxjs/toolkit';
import ticketReducer from '../features/ticketSlice';
import movieReducer from '../features/movieSlice';
import discountReducer from '../features/discountSlice';
import ticketBookerReducer from '../features/ticketBookerSlice';
import authReducer from '../features/authSlice';
export const store = configureStore({
  reducer: {
    ticket: ticketReducer,
    movie: movieReducer,
    discount: discountReducer,
    ticketBooker: ticketBookerReducer,
    auth: authReducer,
  },
});
