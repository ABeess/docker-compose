// mui ui
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Container, Grid, styled, Tab, Typography } from '@mui/material';
import { useState } from 'react';
// Component
import Image from 'src/components/Image';
// Config
import { LESSON } from 'src/config';
import LessonCoding from './LessonCoding';

// ------------------------------
const RootStyle = styled('div')(({ theme }) => ({
  marginRight: LESSON.LIST_ITEM_WIDTH,
}));
const LessonContent = () => {
  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <RootStyle>
      <Container maxWidth="lg">
        <Grid container spacing={1}>
          <Grid item xs={5}>
            <Box sx={{ width: '100%', typography: 'body1' }}>
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <TabList onChange={handleChange} aria-label="lab API tabs example">
                    <Tab label="Nội dung" value="1" />
                  </TabList>
                </Box>
                <TabPanel value="1">
                  <Exercise />
                </TabPanel>
              </TabContext>
            </Box>
          </Grid>
          <Grid item xs={7}>
            <LessonCoding />
          </Grid>
        </Grid>
      </Container>
    </RootStyle>
  );
};

const Exercise = () => {
  return (
    <>
      <Typography variant="body1">Content</Typography>
    </>
  );
};

export default LessonContent;
