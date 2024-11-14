import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchTVShowDetails } from '../../store/thunks/tvShowsThunk';
import { CircularProgress, Box, Card, CardContent, Typography, CardMedia } from '@mui/material';

const ShowDetails = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { tvShowDetails, fetchLoading, error } = useAppSelector((state) => state.tvShows);

  useEffect(() => {
    if (id) {
      dispatch(fetchTVShowDetails(Number(id)));
    }
  }, [id, dispatch]);

  if (fetchLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress color="primary"/>
      </Box>
    );
  }

  if (error) {
    return <p>Error fetching show details</p>;
  }

  if (!tvShowDetails) {
    return <p>No show details available</p>;
  }

  return (
    <Box display="flex" justifyContent="center" alignItems="flex-start" mt={3}>
      <Box width="100%" maxWidth="800px">
        <Card sx={{ padding: 2 }}>
          <CardMedia
            component="img"
            style={{ width: 'auto'}}
            image={tvShowDetails.image.medium || ''}
            alt={tvShowDetails.name}
          />
          <CardContent sx={{ padding: 3 }}>
            <Typography variant="h4" gutterBottom>
              {tvShowDetails.name}
            </Typography>
            <Typography variant="body1" color="textSecondary">
              <strong>Language:</strong> {tvShowDetails.language}
            </Typography>
            <Typography variant="body1" color="textSecondary">
              <strong>Rating:</strong> {tvShowDetails.rating.average}
            </Typography>
            <Typography variant="body1" color="textSecondary">
              <strong>Network:</strong> {tvShowDetails.network?.country.name}
            </Typography>
            <Typography variant="body1" color="textSecondary">
              <strong>Schedule:</strong> {tvShowDetails.schedule.time}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              <span dangerouslySetInnerHTML={{ __html: tvShowDetails.summary }} />
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default ShowDetails;
