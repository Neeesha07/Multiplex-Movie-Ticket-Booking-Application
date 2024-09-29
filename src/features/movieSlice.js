// features/movieSlice.js
import { createSlice } from '@reduxjs/toolkit';

const movieSlice = createSlice({
  name: 'movie',
  initialState: {
    movies: [],
    loading: true,
  },
  reducers: {
    setMovies: (state, action) => {
      state.movies = action.payload;
      state.loading = false;
    },
    clearMovies: (state) => {
      state.movies = [];
      state.loading = true;
    },
  },
});

export const { setMovies, clearMovies } = movieSlice.actions;
export default movieSlice.reducer;
