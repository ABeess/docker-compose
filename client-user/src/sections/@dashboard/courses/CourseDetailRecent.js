import PropTypes from 'prop-types';
// @mui
import { Grid, Typography } from '@mui/material';
//
import CourseCard from './CourseCard';

// ----------------------------------------------------------------------

// CourseDetailRecent.propTypes = {
//   posts: PropTypes.array.isRequired,
// };

export default function CourseDetailRecent({ courses }) {
  return (
    <>
      <Typography variant="h4" sx={{ mt: 10, mb: 5 }}>
        Recent posts
      </Typography>

      <Grid container spacing={3}>
        {courses.map((course) => (
          <Grid key={courses.id} item xs={12} sm={6} md={3}>
            <CourseCard courses={course} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}
