import { capitalCase } from 'change-case';
import { useState } from 'react';
// @mui
import { styled } from '@mui/material/styles';
import { Tab, Box, Card, Tabs, Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from 'src/routes/paths';
// hooks
// import useAuth from '../../../hooks/useAuth';
import useTabs from 'src/hooks/useTabs';
import useSettings from 'src/hooks/useSettings';
// layouts
import Layout from 'src/layouts';
// components
import Page from 'src/components/Page';
import Iconify from 'src/components/Iconify';
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs';
// sections
import {
  Profile,
  ProfileCover,
  ProfileFriends,
  ProfileGallery,
  ProfileFollowers,
  ProfileAccount,
} from 'src/sections/@dashboard/user/profile';

// ----------------------------------------------------------------------

const TabsWrapperStyle = styled('div')(({ theme }) => ({
  zIndex: 9,
  bottom: 0,
  width: '100%',
  display: 'flex',
  position: 'absolute',
  backgroundColor: theme.palette.background.paper,
  [theme.breakpoints.up('sm')]: {
    justifyContent: 'center',
  },
  [theme.breakpoints.up('md')]: {
    justifyContent: 'flex-end',
    paddingRight: theme.spacing(3),
  },
}));

// ----------------------------------------------------------------------

UserProfile.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

const _userAbout = {
  quote: 'Tart I love sugar plum I love oat cake. Sweet roll caramels I love jujubes. Topping cake wafer..',
  country: 'Madagascar',
  email: 'ashlynn_ohara62@gmail.com',
  role: 'Manager',
  company: 'Gleichner, Mueller and Tromp',
  school: 'Nikolaus - Leuschke',
};

const _userFeeds = [
  {
    id: 1,
    isLike: true,
    personLikes: [
      {
        name: 'name',
        avatarUrl: 'https://minimal-assets-api-dev.vercel.app/assets/images/feeds/feed_1.jpg',
      },
    ],
    message: 'Assumenda nam repudiandae rerum fugiat vel maxime.',
    createdAt: '2022-06-26T09:28:00.095+00:00',
    media: 'https://minimal-assets-api-dev.vercel.app/assets/images/feeds/feed_1.jpg',
    comments: [
      {
        id: 1,
        author: {
          name: 'author',
          avatar: 'https://minimal-assets-api-dev.vercel.app/assets/images/feeds/feed_1.jpg',
        },
        createdAt: '2022-06-26T09:28:00.095+00:00',
        message: 'comment message',
      },
      {
        id: 2,
        author: {
          name: 'author',
          avatar: 'https://minimal-assets-api-dev.vercel.app/assets/images/feeds/feed_1.jpg',
        },
        createdAt: '2022-06-26T09:28:00.095+00:00',
        message: 'comment message',
      },
    ],
  },
];

const _userFollowers = [
  {
    id: 1,
    country: 'vietnam',
    avatarUrl: 'https://minimal-assets-api-dev.vercel.app/assets/images/avatars/avatar_1.jpg',
    isFollowed: true,
  },
  {
    id: 2,
    country: 'vietnam',
    avatarUrl: 'https://minimal-assets-api-dev.vercel.app/assets/images/avatars/avatar_1.jpg',
    isFollowed: false,
  },
  {
    id: 3,
    country: 'vietnam',
    avatarUrl: 'https://minimal-assets-api-dev.vercel.app/assets/images/avatars/avatar_1.jpg',
    isFollowed: true,
  },
];

const _userFriends = [
  {
    name: 'Lucian Obrien',
    role: 'full stack designer',
    avatarUrl: 'https://minimal-assets-api-dev.vercel.app/assets/images/avatars/avatar_1.jpg',
  },
];

export default function UserProfile() {
  const { themeStretch } = useSettings();


  const { currentTab, onChangeTab } = useTabs('profile');

  const [findFriends, setFindFriends] = useState('');

  const handleFindFriends = (value) => {
    setFindFriends(value);
  };

  const PROFILE_TABS = [
    {
      value: 'profile',
      icon: <Iconify icon={'ic:round-account-box'} width={20} height={20} />,
      component: <Profile myProfile={_userAbout} posts={_userFeeds} />,
    },
    {
      value: 'account',
      icon: <Iconify icon={'mdi:card-account-details-outline'} width={20} height={20} />,
      component: <ProfileAccount />,
    },
    {
      value: 'followers',
      icon: <Iconify icon={'eva:heart-fill'} width={20} height={20} />,
      component: <ProfileFollowers followers={_userFollowers} />,
    },
    {
      value: 'friends',
      icon: <Iconify icon={'eva:people-fill'} width={20} height={20} />,
      // component: <ProfileFriends friends={_userFriends} findFriends={findFriends} onFindFriends={handleFindFriends} />,
      component: <ProfileFriends friends={_userFriends} findFriends={''} />,
    },
    {
      value: 'gallery',
      icon: <Iconify icon={'ic:round-perm-media'} width={20} height={20} />,
      // component: <ProfileGallery gallery={_userGallery} />,
    },
  ];

  return (
    <Page title="User: Profile">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <Card
          sx={{
            mb: 3,
            height: 280,
            position: 'relative',
          }}
        >
          <ProfileCover myProfile={{ position: 'FullStack', cover: '' }} />

          <TabsWrapperStyle>
            <Tabs
              allowScrollButtonsMobile
              variant="scrollable"
              scrollButtons="auto"
              value={currentTab}
              onChange={onChangeTab}
            >
              {PROFILE_TABS.map((tab) => (
                <Tab disableRipple key={tab.value} value={tab.value} icon={tab.icon} label={capitalCase(tab.value)} />
              ))}
            </Tabs>
          </TabsWrapperStyle>
        </Card>

        {PROFILE_TABS.map((tab) => {
          const isMatched = tab.value === currentTab;
          return isMatched && <Box key={tab.value}>{tab.component}</Box>;
        })}
      </Container>
    </Page>
  );
}
