// features/discountSlice.js
import { createSlice } from '@reduxjs/toolkit';

const discountSlice = createSlice({
  name: 'discount',
  initialState: {
    discounts: [],
    loading: true,
  },
  reducers: {
    setDiscounts: (state, action) => {
      state.discounts = action.payload;
      state.loading = false;
    },
    clearDiscounts: (state) => {
      state.discounts = [];
      state.loading = true;
    },
  },
});

export const { setDiscounts, clearDiscounts } = discountSlice.actions;
export default discountSlice.reducer;
