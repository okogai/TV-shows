import React, { useState, useEffect } from 'react';
import { TextField, CircularProgress, Box } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchSearchResults } from '../../store/thunks/tvShowsThunk';
import { RootState } from '../../app/store';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [title, setTitle] = useState<string>('');
  const { searchResults, loading, error } = useAppSelector((state: RootState) => state.tvShows);

  useEffect(() => {
    if (title) {
      dispatch(fetchSearchResults(title));
    }
  }, [title, dispatch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleOptionSelect = (id: number) => {
    navigate(`/showdetails/${id}`);
  };

  return (
    <div>
      <TextField
        label="Search TV Shows"
        variant="outlined"
        value={title}
        onChange={handleInputChange}
        fullWidth
        InputProps={{
          endAdornment: (
            <>
              {loading && <CircularProgress color="inherit" size={20} />}
            </>
          ),
        }}
      />
      {error && <p>Error fetching results</p>}
      {title && !loading && (
        <Box>
          {searchResults.map((show) => (
            <div
              key={show.id}
              onClick={() => handleOptionSelect(show.id)}
              style={{
                padding: '10px',
                marginBottom: '5px',
                border: '1px solid #ccc',
                cursor: 'pointer',
                borderRadius: '4px',
                backgroundColor: '#f9f9f9',
              }}
            >
              {show.title}
            </div>
          ))}
        </Box>
      )}
    </div>
  );
};

export default SearchBar;
