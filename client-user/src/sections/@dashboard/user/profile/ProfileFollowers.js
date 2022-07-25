import PropTypes from 'prop-types';
import { useRef, useState } from 'react';
// @mui
import { Avatar, Box, Button, Card, Grid, Typography } from '@mui/material';
// components
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useInfiniteQuery } from 'react-query';
import Iconify from 'src/components/Iconify';
import SkeletonFllowerCard from 'src/components/skeleton/SkeletonFllowerCard';
import { getAllFllowers } from 'src/fetching/follower.api';

// ----------------------------------------------------------------------

ProfileFollowers.propTypes = {
  followers: PropTypes.array,
};

export default function ProfileFollowers() {
  //reactquery + populate + infinity scroll
  const { ref, inView } = useInView({
    threshold: 0,
  });
  const [limit, setLimit] = useState(0);
  const gridRef = useRef(null);

  const { hasNextPage, data, isFetching, isFetchingNextPage, fetchNextPage } = useInfiniteQuery(
    ['fllower', limit],
    async ({ queryKey, pageParam = 0 }) => {
      const limit = queryKey[1];
      const { data } = await getAllFllowers({ limit, page: pageParam });
      return data;
    },
    {
      getNextPageParam: (lastPage, pages) => {
        return lastPage[0] !== undefined && lastPage.length === limit ? pages.length : undefined;
      },
      staleTime: 60000,
    }
  );
  useEffect(() => {
    const viewHeight = window.innerHeight;
    const { offsetHeight, offsetTop, offsetWidth } = gridRef?.current;
    const totalWidth = offsetWidth < 900 ? 2 : 4;
    const totalHeight = ((viewHeight - (offsetTop + offsetHeight)) / 120) * totalWidth;
    setLimit(totalHeight > 6 ? totalHeight : 9);
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  return (
    <Box sx={{ mt: 5 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Followers
      </Typography>
      <Grid container spacing={3} ref={gridRef}>
        {!data
          ? [...Array(6)].map((_, index) => <SkeletonFllowerCard key={index} />)
          : data?.pages?.flat().map((follower) => (
              <Grid key={follower._id} item xs={12} md={4}>
                <FollowerCard follower={follower} />
              </Grid>
            ))}
      </Grid>
      {isFetchingNextPage && hasNextPage && (
        <Grid container spacing={2}>
          {[...Array(6)].map((_, index) => (
            <SkeletonFllowerCard key={index} />
          ))}
        </Grid>
      )}
      {isFetching ? <></> : <Box ref={ref} sx={{ height: 8, display: hasNextPage ? 'block' : 'none' }}></Box>}
    </Box>
  );
}

// ----------------------------------------------------------------------

FollowerCard.propTypes = {
  follower: PropTypes.object,
};

function FollowerCard({ follower }) {
  const { name, country, avatarUrl, isFollowed } = follower;

  const [toggle, setToogle] = useState(isFollowed);

  return (
    <Card sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
      <Avatar alt={name} src={avatarUrl} sx={{ width: 48, height: 48 }} />
      <Box sx={{ flexGrow: 1, minWidth: 0, pl: 2, pr: 1 }}>
        <Typography variant="subtitle2" noWrap>
          {name}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Iconify icon={'eva:pin-fill'} sx={{ width: 16, height: 16, mr: 0.5, flexShrink: 0 }} />
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {country}
          </Typography>
        </Box>
      </Box>
      <Button
        size="small"
        onClick={() => setToogle(!toggle)}
        variant={toggle ? 'text' : 'outlined'}
        color={toggle ? 'primary' : 'inherit'}
        startIcon={toggle && <Iconify icon={'eva:checkmark-fill'} />}
      >
        {toggle ? 'Followed' : 'Follow'}
      </Button>
    </Card>
  );
}
