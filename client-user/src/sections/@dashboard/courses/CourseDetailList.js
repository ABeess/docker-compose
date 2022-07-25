import {
  Box,
  Breadcrumbs,
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import { styled } from '@mui/system';
import { useState } from 'react';
import Iconify from 'src/components/Iconify';

// -------------------------------
const DUMMY_DATA = [
  {
    id: 1,
    title: 'Tutorials',
    children: [
      {
        id: 1,
        title: 'Complete beginners',
      },
      {
        id: 2,
        title: 'JavaScript basics',
      },
      {
        id: 3,
        title: 'JavaScript first steps',
      },
      {
        id: 4,
        title: 'JavaScript building blocks',
      },
      {
        id: 5,
        title: 'Introducing JavaScript objects',
      },
    ],
  },
  {
    id: 2,
    title: 'JavaScript Guide',
    children: [
      {
        id: 1,
        title: 'Introduction',
      },
      {
        id: 2,
        title: 'Grammar and types',
      },
      {
        id: 3,
        title: 'Control flow and error handling',
      },
      {
        id: 4,
        title: 'Loops and iteration',
      },
      {
        id: 5,
        title: 'Functions',
      },
      {
        id: 6,
        title: 'Expressions and operators',
      },
      {
        id: 7,
        title: 'Numbers and dates',
      },
    ],
  },
  {
    id: 3,
    title: 'Intermediate',
    children: [
      {
        id: 1,
        title: 'Client-side JavaScript frameworks',
      },
      {
        id: 2,
        title: 'Client-side web APIs',
      },
      {
        id: 3,
        title: 'A re-introduction to JavaScript',
      },
      {
        id: 4,
        title: 'JavaScript data structures',
      },
      {
        id: 5,
        title: 'Equality comparisons and sameness',
      },
      {
        id: 6,
        title: 'Closures',
      },
    ],
  },
  {
    id: 4,
    title: 'Advanced',
    children: [
      {
        id: 1,
        title: 'Inheritance and the prototype chain',
      },
      {
        id: 2,
        title: 'Strict mode',
      },
      {
        id: 3,
        title: 'JavaScript typed arrays',
      },
      {
        id: 4,
        title: 'Memory Management',
      },
      {
        id: 5,
        title: 'Concurrency model and Event Loop',
      },
    ],
  },
];

const RootStyle = styled('div')(({ theme }) => ({}));

const ListItemStyle = styled(ListItemButton)(({ theme }) => ({
  paddingTop: theme.spacing(1.5),
  paddingBottom: theme.spacing(1.5),
  backgroundColor: theme.palette.grey[500_12],
  borderRadius: theme.shape.borderRadius,
  marginTop: theme.spacing(1.5),
}));

const CourseDetailList = () => {
  const [isCollapse, setIsCollapse] = useState(false);

  const handleClick = (id) => {
    setIsCollapse((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <RootStyle>
      <Typography variant="h4">Course content</Typography>
      <Breadcrumbs separator={<Iconify icon="ci:dot-03-m" />} aria-label="breadcrumb" sx={{ mt: 2 }}>
        <Typography variant="body1">
          <strong>20</strong> chapter
        </Typography>
        <Typography>
          <strong>120</strong> lesson
        </Typography>
        <Typography>Time</Typography>
      </Breadcrumbs>

      <List>
        {DUMMY_DATA.map((course) => (
          <Box key={course.id}>
            <ListItemStyle size="large" onClick={() => handleClick(course.id)}>
              <ListItemIcon>
                <Iconify
                  icon={isCollapse[course.id] ? 'akar-icons:minus' : 'akar-icons:plus'}
                  sx={{ color: 'primary.main' }}
                />
              </ListItemIcon>
              <ListItemText
                sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                primary={<Typography variant="subtitle1">{course.title}</Typography>}
                secondary={
                  <Typography variant="body2" color="text.secondary">
                    1 lesson
                  </Typography>
                }
              />
            </ListItemStyle>
            <Collapse in={isCollapse[course.id]}>
              {course.children.map((child) => (
                <LisSubItem key={child.id} items={child} />
              ))}
            </Collapse>
          </Box>
        ))}
      </List>
    </RootStyle>
  );
};

const LisSubItem = ({ items }) => {
  return (
    <List>
      <ListItem sx={{ ml: 2.5 }}>
        <ListItemIcon>
          <Iconify icon="material-symbols:event-note-outline" />
        </ListItemIcon>
        <ListItemText primary={<Typography variant="body1">{items.title}</Typography>} />
      </ListItem>
    </List>
  );
};

export default CourseDetailList;
