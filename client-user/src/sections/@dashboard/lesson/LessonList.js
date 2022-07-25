import { useRecoilValue } from 'recoil';
import { useState } from 'react';
// mui ui
import { Box, Collapse, List, ListItemButton, ListItemIcon, ListItemText, styled, Typography } from '@mui/material';
// components
import Iconify from 'src/components/Iconify';
import Scrollbar from 'src/components/Scrollbar';
import offsetAtom from 'src/recoils/offsetAtom';
import LessonItem from './LessonItem';
// Config
import { HEADER, LESSON } from 'src/config';

// -------------------------------

const RootStyle = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isOffset',
})(({ isOffset, theme }) => ({
  position: 'fixed',
  width: LESSON.LIST_ITEM_WIDTH,
  right: theme.spacing(2),
  bottom: 0,
  boxShadow: theme.customShadows.z1,
  transition: theme.transitions.create(['all'], {
    duration: theme.transitions.duration.shorter,
  }),
  top: 116,
  ...(isOffset && { top: HEADER.DASHBOARD_DESKTOP_OFFSET_HEIGHT }),
}));

const ContentStyle = styled(Box)(({ theme }) => ({
  borderRadius: 4,
  overflow: 'hidden',
  boxShadow: theme.customShadows.z24,
}));

const ListItemStyle = styled(ListItemButton)(({ theme }) => {
  const isLight = theme.palette.mode === 'light';
  return {
    position: 'sticky',
    top: 0,
    zIndex: 100,
    backgroundColor: isLight ? theme.palette.grey[200] : theme.palette.grey[800],
    '&:hover': {
      backgroundColor: isLight ? theme.palette.grey[300] : theme.palette.grey[700],
    },
  };
});

const LessonList = ({ data }) => {
  const [isCollapse, setIsCollapse] = useState(false);

  const isOffset = useRecoilValue(offsetAtom);

  const handleClick = (id) => {
    setIsCollapse((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <RootStyle isOffset={isOffset}>
      <List
        disablePadding
        components="div"
        // subheader={
        //   <Typography variant="h6" sx={{ p: 1.5 }}>
        //     Course content
        //   </Typography>
        // }
      >
        <ContentStyle>
          <Scrollbar sx={{ height: `calc(100vh - ${HEADER.DASHBOARD_DESKTOP_OFFSET_HEIGHT}px)`, pb: 1 }}>
            {data.map((list) => (
              <div key={list.id}>
                <ListItemStyle onClick={() => handleClick(list.id)}>
                  <ListItemText
                    primary={<Typography variant="subtitle1">1. {list.title}</Typography>}
                    secondary={
                      <Typography variant="caption" color="text.secondary">
                        0/2 | 06:28
                      </Typography>
                    }
                  />
                  <ListItemIcon>
                    <Iconify icon={isCollapse[list.id] ? 'ep:arrow-down-bold' : 'ep:arrow-right-bold'} />
                  </ListItemIcon>
                </ListItemStyle>
                <Collapse in={isCollapse[list.id]}>
                  {list.track_steps.map((child) => (
                    <LessonItem key={child.id} items={child} />
                  ))}
                </Collapse>
              </div>
            ))}
          </Scrollbar>
        </ContentStyle>
      </List>
    </RootStyle>
  );
};

export default LessonList;
