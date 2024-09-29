// features/ticketBookerSlice.js
import { createSlice } from '@reduxjs/toolkit';

const ticketBookerSlice = createSlice({
  name: 'ticketBooker',
  initialState: {
    ticketBooker: null,
    loading: true,
  },
  reducers: {
    setTicketBooker: (state, action) => {
      state.ticketBooker = action.payload;
      state.loading = false;
    },
    clearTicketBooker: (state) => {
      state.ticketBooker = null;
      state.loading = true;
    },
  },
});

export const { setTicketBooker, clearTicketBooker } = ticketBookerSlice.actions;
export default ticketBookerSlice.reducer;
