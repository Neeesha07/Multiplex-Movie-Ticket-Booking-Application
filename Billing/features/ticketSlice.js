import { createSlice } from '@reduxjs/toolkit';

const ticketSlice = createSlice({
  name: 'ticket',
  initialState: {
    ticket: null,
    discounts: [],
  },
  reducers: {
    setTicket: (state, action) => {
      state.ticket = action.payload;
    },
    setDiscounts: (state, action) => {
      state.discounts = action.payload;
    },
    clearTicket: (state) => {
      state.ticket = null;
      state.discounts = [];
    },
  },
});

export const { setTicket, setDiscounts, clearTicket } = ticketSlice.actions;
export default ticketSlice.reducer;
