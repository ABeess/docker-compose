// Mui ui
import { Badge, Box, Card, Container, Grid, InputAdornment, Stack, styled, TextField, Typography } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
// Components
import Iconify from 'src/components/Iconify';
import Image from 'src/components/Image';
import Scrollbar from 'src/components/Scrollbar';
import TextMaxLine from 'src/components/TextMaxLine';

// ------------------------------------------------------------
const RootStyle = styled('div')(({ theme }) => ({
  boxShadow: theme.customShadows.z12,
  position: 'sticky',
}));

const CourseInfoCard = styled(Card)(({ theme }) => ({
  border: `1px dashed ${theme.palette.primary.main}`,
  height: 80,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  marginTop: theme.spacing(3),
}));

const BadgeOverides = styled(Badge)(({ theme }) => ({
  '& 	.MuiBadge-anchorOriginTopRight': {
    top: '2px',
    right: '-12px',
  },
}));

const CourseRightNav = () => {
  const [offsetTop, setOffSetTop] = useState(0);

  const [line, setLine] = useState(2);

  const ref = useRef(null);

  useEffect(() => {
    const offset = ref.current.getBoundingClientRect().top;
    setOffSetTop(offset);
  }, []);

  const handleShowMore = () => {
    setLine((prev) => (prev === 0 ? 2 : 0));
  };

  return (
    <RootStyle ref={ref} sx={{ top: offsetTop }}>
      <Scrollbar sx={{ height: `calc(100vh - ${offsetTop}px)` }}>
        <Container maxWidth="lg" sx={{ height: 1 }}>
          <TextField
            fullWidth
            size="small"
            placeholder="Search"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify icon={'eva:search-fill'} sx={{ width: 20, height: 20, color: 'text.disabled' }} />
                </InputAdornment>
              ),
            }}
          />

          <Card sx={{ mt: 5 }}>
            <Image src="https://img2.thuthuatphanmem.vn/uploads/2019/01/04/anh-co-gai-de-thuong_025058983.jpg" />
          </Card>

          <Typography variant="h4" sx={{ fontWeight: 500, mt: 3, mb: 1 }}>
            Cultivate Calm and Creativity with Fun Drawing Projects
          </Typography>
          <div>
            <TextMaxLine line={line} variant="body2" component="p">
              Nurture yourself while you practice your drawing skills with two distinct and meditative techniques.
              One-line drawing is trendy, but it is way to break down shapes One-line drawing is trendy, but it is way
              to break down shapes
            </TextMaxLine>
            <Typography
              color="primary"
              sx={{ cursor: 'pointer' }}
              variant="caption"
              component="span"
              onClick={handleShowMore}
            >
              {line === 0 ? 'Less' : 'More'}
            </Typography>
          </div>

          <Grid container spacing={1}>
            <Grid item xs={4}>
              <CourseInfoCard>
                <BadgeOverides>
                  <Typography variant="h4" align="center" color="primary">
                    13
                  </Typography>
                </BadgeOverides>
                <Typography variant="caption">Chapters</Typography>
              </CourseInfoCard>
            </Grid>
            <Grid item xs={4}>
              <CourseInfoCard>
                <BadgeOverides badgeContent="th">
                  <Typography variant="h4" align="center" color="primary">
                    04
                  </Typography>
                </BadgeOverides>
                <Typography variant="caption">Chapters</Typography>
              </CourseInfoCard>
            </Grid>
            <Grid item xs={4}>
              <CourseInfoCard>
                <BadgeOverides badgeContent="hrs">
                  <Typography variant="h4" align="center" color="primary">
                    56
                  </Typography>
                </BadgeOverides>
                <Typography variant="caption">Chapters</Typography>
              </CourseInfoCard>
            </Grid>
          </Grid>

          <Box sx={{ mt: 4, pb: 3 }}>
            <Typography variant="h4" sx={{ fontWeight: 500, mb: 2 }}>
              Course Details
            </Typography>
            <Scrollbar sx={{ height: '50vh' }}>
              <Stack spacing={2}>
                <CoursDetailsCard />
                <CoursDetailsCard />
                <CoursDetailsCard />
                <CoursDetailsCard />
                <CoursDetailsCard />
              </Stack>
            </Scrollbar>
          </Box>
        </Container>
      </Scrollbar>
    </RootStyle>
  );
};

const CoursDetailsCard = () => {
  const BoxColorStyle = styled(Box)(({ theme }) => ({
    width: 40,
    height: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.palette.primary.main,
    borderRadius: theme.shape.borderRadius,
  }));
  return (
    <Box>
      <Card sx={{ width: 1, px: 2.5, py: 1 }}>
        <Stack direction="row" spacing={2} alignItems="center">
          <BoxColorStyle>
            <Typography variant="subtitle1" color="common.white">
              1
            </Typography>
          </BoxColorStyle>
          <Typography variant="subtitle1" color="text.secondary">
            Introduction
          </Typography>
        </Stack>
      </Card>
    </Box>
  );
};

export default CourseRightNav;
