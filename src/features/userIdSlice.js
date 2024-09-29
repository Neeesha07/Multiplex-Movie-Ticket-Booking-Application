import { createSlice } from '@reduxjs/toolkit';

const userIdSlice = createSlice({
  name: 'userId',
  initialState: null,
  reducers: {
    setUserId: (state, action) => action.payload,
    clearUserId: () => null,
  },
});

export const { setUserId, clearUserId } = userIdSlice.actions;
export default userIdSlice.reducer;