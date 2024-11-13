import { createSlice } from '@reduxjs/toolkit';

interface tvShowsState {
}

const initialState: tvShowsState = {
}


const tvShowsSlicer = createSlice({
  name: 'tvShows',
  initialState,
  reducers: {
  }
});

export const tvShowsReducer = tvShowsSlicer.reducer;

