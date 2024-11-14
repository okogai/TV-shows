import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchSearchResults, fetchTVShowDetails } from '../thunks/tvShowsThunk.ts';
import { ITVShow, ShowOption } from '../../types';

interface tvShowsState {
  searchResults: ShowOption[];
  tvShowDetails: ITVShow | null;
  fetchLoading: boolean;
  searchLoading: boolean;
  error: boolean;
}

const initialState: tvShowsState = {
  searchResults: [],
  tvShowDetails: null,
  fetchLoading: false,
  searchLoading: false,
  error: false,
};

export const tvShowsSlice = createSlice({
  name: 'tvShows',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchResults.pending, (state) => {
        state.searchLoading = true;
        state.error = false;
      })
      .addCase(fetchSearchResults.fulfilled, (state, action: PayloadAction<ShowOption[]>) => {
        state.searchLoading = false;
        state.searchResults = action.payload;
      })
      .addCase(fetchSearchResults.rejected, (state) => {
        state.searchLoading = false;
        state.error = true;
      })
      .addCase(fetchTVShowDetails.pending, (state) => {
        state.fetchLoading = true;
        state.error = false;
      })
      .addCase(fetchTVShowDetails.fulfilled, (state, action: PayloadAction<ITVShow>) => {
        state.fetchLoading = false;
        state.tvShowDetails = action.payload;
      })
      .addCase(fetchTVShowDetails.rejected, (state) => {
        state.fetchLoading = false;
        state.error = true;
      });
  },
});

export const tvShowsReducer = tvShowsSlice.reducer;

