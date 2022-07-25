// @mui
import { Avatar, ListItem, Typography, ListItemText, ListItemAvatar, Rating } from '@mui/material';
// utils
import { fDate } from 'src/utils/formatTime';

// ----------------------------------------------------------------------

export default function CourseDetailCommentItem({ name, avatarUrl, message, tagUser, postedAt }) {
  return (
    <>
      <ListItem
        disableGutters
        sx={{
          alignItems: 'flex-start',
          py: 3,
        }}
      >
        <ListItemAvatar>
          <Avatar alt={name} src={avatarUrl} sx={{ width: 48, height: 48 }} />
        </ListItemAvatar>

        <ListItemText
          primary={name}
          primaryTypographyProps={{ variant: 'subtitle1' }}
          secondary={
            <>
              <Rating
                value={5}
                readOnly
                sx={{
                  '& svg': {
                    width: 12,
                    height: 12,
                  },
                }}
              />
              <Typography
                gutterBottom
                variant="caption"
                sx={{
                  display: 'block',
                  color: 'text.disabled',
                }}
              >
                {fDate(postedAt)}
              </Typography>
              <Typography component="span" variant="body2">
                <strong>{tagUser}</strong> {message}
              </Typography>
            </>
          }
        />
      </ListItem>
    </>
  );
}
