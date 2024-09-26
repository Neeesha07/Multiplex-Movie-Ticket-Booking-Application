import { configureStore } from '@reduxjs/toolkit';
import ticketReducer from '../features/ticketSlice';

export const store = configureStore({
  reducer: {
    ticket: ticketReducer,
  },
});
