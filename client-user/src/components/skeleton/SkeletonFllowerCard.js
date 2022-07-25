import { Box, Grid, Skeleton } from '@mui/material';
import React from 'react';

const SkeletonFllowerCard = () => {
  return (
    <Grid item xs={12} md={4}>
      <Box sx={{ mt: 3 }}>
        <Skeleton variant="rectangular" width="100%" sx={{ height: 120, borderRadius: 2 }} />
      </Box>
    </Grid>
  );
};

export default SkeletonFllowerCard;
