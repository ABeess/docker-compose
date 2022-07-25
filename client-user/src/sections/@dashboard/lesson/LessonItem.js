import { List, ListItemButton, ListItemText, styled, Typography } from '@mui/material';
import React from 'react';

const ListItemStyle = styled(ListItemButton)(({ theme }) => ({}));

const LessonItem = ({ items }) => {
  return (
    <List disablePadding>
      <ListItemStyle>
        <ListItemText
          primary={<Typography variant="body2">1. {items.step.title}</Typography>}
          secondary={<Typography variant="caption">04:20</Typography>}
        />
      </ListItemStyle>
    </List>
  );
};

export default LessonItem;
