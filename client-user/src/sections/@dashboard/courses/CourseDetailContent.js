// mui ui
import { Box, Grid, List, ListItem, ListItemIcon, ListItemText, styled, Typography } from '@mui/material';
// components
import Iconify from 'src/components/Iconify';

// ------------------------------
const RootStyle = styled('div')(({ theme }) => ({}));

const CourseDetailContent = () => {
  return (
    <RootStyle>
      <Typography variant="h6" sx={{ mb: 5 }}>
        Apply These 7 Secret Techniques To Improve Event
      </Typography>

      <Box sx={{ border: (theme) => `1px solid ${theme.palette.grey[300]}` }}>
        <List
          sx={{ pt: 3 }}
          subheader={
            <Typography variant="h4" sx={{ mb: 3, ml: 2 }}>
              What you'll learn
            </Typography>
          }
        >
          <Grid container spacing={2}>
            {[...Array(6)].map((_, index) => (
              <Grid key={index} item xs={6}>
                <ListItem>
                  <ListItemIcon sx={{ mr: 1 }}>
                    <Iconify icon="ci:check" />
                  </ListItemIcon>
                  <ListItemText primary={<Typography variant="body1">How to create a wireframe</Typography>} />
                </ListItem>
              </Grid>
            ))}
          </Grid>
        </List>
      </Box>

      <Box sx={{ mt: 4 }}>
        <List
          disablePadding
          subheader={
            <Typography variant="h4" sx={{ mb: 1, ml: 2 }}>
              Requirements
            </Typography>
          }
        >
          {[...Array(4)].map((_, index) => (
            <ListItem key={index}>
              <ListItemIcon sx={{ mr: 1 }}>
                <Iconify icon="ci:dot-03-m" />
              </ListItemIcon>
              <ListItemText
                primary={<Typography variant="body1">Desire to learn and a willingness to be challenged.</Typography>}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </RootStyle>
  );
};

export default CourseDetailContent;
