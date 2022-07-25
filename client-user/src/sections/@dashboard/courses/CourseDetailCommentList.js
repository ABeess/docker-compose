import PropTypes from 'prop-types';
// @mui
import { Box, List } from '@mui/material';
//component
import CourseDetailCommentItem from './CourseDetailCommentItem';

// ----------------------------------------------------------------------

// CourseDetailCommentList.propTypes = {
//   post: PropTypes.object.isRequired,
// };

export default function CourseDetailCommentList({ comments }) {
  return (
    <List disablePadding>
      {[1, 2, 3]?.map((comment, index) => {
        // const { id } = comment;

        return (
          <Box key={index}>
            <CourseDetailCommentItem
              name={'comment.name'}
              atarUrl={'comment.avatarUrl'}
              // postedAt={'comment.postedAt'}
              postedAt={new Date().getTime()}
              message={'comment.message'}
            />
          </Box>
        );
      })}
    </List>
  );
}
