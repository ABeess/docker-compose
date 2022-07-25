import { useState } from 'react';
// @mui
import { Box, Rating, Typography, Stack, LinearProgress, styled } from '@mui/material';
// ----------------------------------------------------------------------

const LinearProgressStyle = styled(LinearProgress)(({ theme }) => ({
  height: 12,
  flex: 1,
  backgroundColor: '#fff',
}));

export default function CourseDetailRating() {
  const [value, setValue] = useState(2);

  return (
    <Box sx={{ py: 3 }}>
      <Typography variant="h4">Student feedback</Typography>

      <Box sx={{ display: 'flex', alignItems: 'center', mt: 3 }}>
        <Stack direction="row" sx={{ width: 1 }} spacing={5} alignItems="center">
          <Stack alignItems="center" sx={{ ml: 2 }}>
            <Typography variant="h2" sx={{ color: '#faaf00' }}>
              4.4
            </Typography>
            <Rating
              name="simple-controlled"
              value={value}
              precision={0.5}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
            />
            <Typography variant="h6" sx={{ color: '#faaf00', mt: 1 }}>
              Coures Rating
            </Typography>
          </Stack>

          <Stack sx={{ flex: 1 }} justifyContent="space-between" spacing={1.5}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <LinearProgressStyle variant="buffer" value={50} valueBuffer={100} />
              <Rating readOnly value={5} />
            </Stack>
            <Stack direction="row" alignItems="center" spacing={2}>
              <LinearProgressStyle variant="buffer" value={40} valueBuffer={100} />
              <Rating readOnly value={4} />
            </Stack>
            <Stack direction="row" alignItems="center" spacing={2}>
              <LinearProgressStyle variant="buffer" value={30} valueBuffer={100} />
              <Rating readOnly value={3} />
            </Stack>
            <Stack direction="row" alignItems="center" spacing={2}>
              <LinearProgressStyle variant="buffer" value={20} valueBuffer={100} />
              <Rating readOnly value={2} />
            </Stack>
            <Stack direction="row" alignItems="center" spacing={2}>
              <LinearProgressStyle variant="buffer" value={10} valueBuffer={100} />
              <Rating readOnly value={1} />
            </Stack>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}
