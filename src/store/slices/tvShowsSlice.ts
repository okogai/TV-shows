import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchSearchResults, fetchTVShowDetails } from '../thunks/tvShowsThunk.ts';
import { ITVShow, ShowOption } from '../../types';

interface tvShowsState {
  searchResults: ShowOption[];
  tvShowDetails: ITVShow | null;
  loading: boolean;
  error: boolean;
}

const initialState: tvShowsState = {
  searchResults: [],
  tvShowDetails: null,
  loading: false,
  error: false,
};

export const tvShowsSlice = createSlice({
  name: 'tvShows',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchResults.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchSearchResults.fulfilled, (state, action: PayloadAction<ShowOption[]>) => {
        state.loading = false;
        state.searchResults = action.payload;
      })
      .addCase(fetchSearchResults.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(fetchTVShowDetails.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchTVShowDetails.fulfilled, (state, action: PayloadAction<ITVShow>) => {
        state.loading = false;
        state.tvShowDetails = action.payload;
      })
      .addCase(fetchTVShowDetails.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export const tvShowsReducer = tvShowsSlice.reducer;

