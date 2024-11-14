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
  const { searchResults, searchLoading, error } = useAppSelector((state: RootState) => state.tvShows);

  useEffect(() => {
    if (title) {
      dispatch(fetchSearchResults(title));
    }
  }, [title, dispatch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleOptionSelect = (id: number) => {
    navigate(`/show/${id}`);
    setTitle('');
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      mt={4}
      px={2}
    >
      <Box width="100%" maxWidth="600px">
        <TextField
          label="Search TV Shows"
          variant="outlined"
          value={title}
          onChange={handleInputChange}
          fullWidth
          slotProps={{
            input: {
              endAdornment: (
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  sx={{ visibility: searchLoading ? 'visible' : 'hidden' }}
                >
                  <CircularProgress color="primary" size={24} />
                </Box>
              ),
            },
          }}
        />
        {error && <p>Error fetching results</p>}
        {title && !searchLoading && (
          <Box mt={2}>
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
      </Box>
    </Box>
  );
};

export default SearchBar;
