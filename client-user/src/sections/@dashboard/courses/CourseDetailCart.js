// mui ui
import { Button, Card, Divider, List, ListItem, ListItemIcon, ListItemText, Stack, Typography } from '@mui/material';
import { styled } from '@mui/system';
// Components
import Iconify from 'src/components/Iconify';
import Image from 'src/components/Image';
import Scrollbar from 'src/components/Scrollbar';
// config
import { HEADER } from 'src/config';
// -------------------------------

const COURSE_INCLUDE = [
  {
    id: '1',
    title: '2.5 hours on-demand video',
    icon: 'ic:baseline-live-tv',
  },
  {
    id: '2',
    title: 'Full lifetime access',
    icon: 'ic:baseline-live-tv',
  },
  {
    id: '3',
    title: 'Access on mobile and TV',
    icon: 'raphael:iphone',
  },
  {
    id: '4',
    title: 'Assignments',
    icon: 'fluent:notepad-24-filled',
  },
  {
    id: '5',
    title: 'Certificate of completion',
    icon: 'fluent:trophy-32-regular',
  },
];

const RootStyle = styled('div')(({ theme }) => ({
  position: 'sticky',
  top: HEADER.MAIN_DESKTOP_HEIGHT,
}));

const CourseDetailCart = () => {
  return (
    <RootStyle>
      <Scrollbar sx={{ height: '80vh' }}>
        <Card sx={{ p: 2 }}>
          <Image
            src="https://minimal-assets-api-dev.vercel.app/assets/images/covers/cover_1.jpg"
            sx={{ borderRadius: 1 }}
          />

          <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 2 }}>
            <Typography variant="h4">$13.99</Typography>
            <Typography variant="body1" color="text.disabled" sx={{ textDecoration: 'line-through' }}>
              $84.99
            </Typography>
            <Typography variant="body2">80% off</Typography>
          </Stack>
          <List disablePadding>
            <ListItem sx={{ color: (theme) => theme.palette.error.main, px: 0 }}>
              <ListItemIcon sx={{ mr: 0.5 }}>
                <Iconify icon="raphael:stopwatch" sx={{ width: 15, height: 15 }} />
              </ListItemIcon>
              <ListItemText
                primary={
                  <>
                    <Typography variant="subtitle2" component="span">
                      5 hours
                    </Typography>
                    <Typography variant="caption" sx={{ ml: 0.5 }}>
                      left at this price!
                    </Typography>
                  </>
                }
              />
            </ListItem>
          </List>

          <Stack spacing={2} sx={{ mt: 2 }}>
            <Button variant="contained">Add to cart</Button>
            <Button variant="outlined">buy now</Button>
            <Typography variant="body2" color="text.secondary" align="center">
              30-Day Money-Back Guarantee
            </Typography>
          </Stack>

          <List
            sx={{ mt: 2 }}
            subheader={
              <Typography variant="subtitle1" sx={{ ml: 2 }}>
                This course includes:
              </Typography>
            }
          >
            {COURSE_INCLUDE.map((item) => (
              <ListItem key={item.id}>
                <ListItemIcon>
                  <Iconify icon={item.icon} />
                </ListItemIcon>
                <ListItemText primary={<Typography variant="body2">{item.title}</Typography>} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <Stack spacing={1} sx={{ mt: 2 }}>
            <Typography variant="h5">Training 5 or more people?</Typography>
            <Typography variant="body2">
              Get your team access to 16,000+ top Udemy courses anytime, anywhere.
            </Typography>
            <Button variant="outlined">Try Business</Button>
          </Stack>
        </Card>
      </Scrollbar>
    </RootStyle>
  );
};

export default CourseDetailCart;
