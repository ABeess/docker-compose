import { useEffect, useState } from 'react';
import { sentenceCase } from 'change-case';
// next
// @mui
import { Box, Divider, Container, Typography, Pagination, Grid } from '@mui/material';
// routes
import { PATH_DASHBOARD } from 'src/routes/paths';
// hooks
import useSettings from 'src/hooks/useSettings';
// layouts
import Layout from 'src/layouts';
// components
import Page from 'src/components/Page';
import Markdown from 'src/components/Markdown';
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs';
import { SkeletonPost } from 'src/components/skeleton';
import { getOneCourse } from 'src/fetching/course.api';

// Section
import {
  CourseDetailHero,
  CourseDetailCart,
  CourseDetailRating,
  CourseDetailCommentList,
  CourseDetailsCommentForm,
  CourseDetailRecent,
  CourseDetailList,
} from 'src/sections/@dashboard/courses';
import { dehydrate, QueryClient, useQuery } from 'react-query';
import { useRouter } from 'next/router';

// ----------------------------------------------------------------------

CourseDetail.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function CourseDetail() {
  const { themeStretch } = useSettings();

  const {
    query: { slug },
  } = useRouter();
  const [recentPosts, setRecentPosts] = useState([]);

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  useEffect(() => {}, []);

  const { data } = useQuery(
    'course-details',
    async () =>
      await getOneCourse({
        id: null,
        where: {
          slug,
        },
      }),
    { enabled: !!slug }
  );

  const course = data?.data[0];

  // const getRecentPosts = useCallback(async () => {
  //   try {
  //     const response = await axios.get('/api/blog/posts/recent', {
  //       params: { title },
  //     });

  //     if (isMountedRef.current) {
  //       setRecentPosts(response.data.recentPosts);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }, [isMountedRef, title]);

  // useEffect(() => {
  //   getRecentPosts();
  // }, [getRecentPosts]);

  return (
    <Page title="Course Details">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Course Details"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Course', href: PATH_DASHBOARD.courses.root },
            { name: sentenceCase('title') },
          ]}
        />

        {/* {course && ( */}
        {true && (
          <>
            {/* <CourseDetailHero course={course} /> */}

            <Box sx={{ p: { xs: 3, md: 5 } }}>
              <Typography variant="h6" sx={{ mb: 5 }}>
                {'course.subTitle'}
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={8}>
                  <Markdown children={'course.description'} />
                  <CourseDetailList />
                  {/* <CourseDetailContent /> */}
                </Grid>
                <Grid item xs={4}>
                  <CourseDetailCart />
                </Grid>
              </Grid>

              <Box sx={{ my: 5 }}>
                <Divider />
                <CourseDetailRating />
                <Divider />
              </Box>

              <Box sx={{ display: 'flex', mb: 2 }}>
                <Typography variant="h4">Comments</Typography>
                <Typography variant="subtitle2" sx={{ color: 'text.disabled' }}>
                  {/* ({post?.comments?.length}) */}
                </Typography>
              </Box>

              {/* <CourseDetailCommentList comments={post.comments} /> */}
              <CourseDetailCommentList comments={comments} />

              <Box sx={{ mb: 5, mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                <Pagination count={8} color="primary" />
              </Box>

              <CourseDetailsCommentForm />
            </Box>
          </>
        )}

        {!course && <SkeletonPost />}

        <CourseDetailRecent courses={recentPosts} />
      </Container>
    </Page>
  );
}

export const getServerSideProps = async ({ query }) => {
  const slug = query.slug;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(
    'course-details',
    async () =>
      await getOneCourse({
        id: null,
        where: { slug },
      }),
    { enabled: !!slug }
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
