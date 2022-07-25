import { useEffect } from 'react';
//hooks
import useSettings from 'src/hooks/useSettings';
// layouts
import Layout from 'src/layouts';
// Hooks
import useCollapseDrawer from 'src/hooks/useCollapseDrawer';
// components
import Page from 'src/components/Page';
import { LessonCoding, LessonContent, LessonList } from 'src/sections/@dashboard/lesson';
// utils - fake API
import axiosInstance from 'src/utils/axios';
// ----------------------------------------------------------------------

CourseLesson.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function CourseLesson({ data }) {
  const { themeStretch } = useSettings();

  const collapseClick = useCollapseDrawer();

  useEffect(() => {
    if (window !== undefined) {
      collapseClick.onToggleCollapse();
    }
  }, []);

  return (
    <Page title="Lesson">
      <LessonContent data={data} />
      <LessonList data={data} />
    </Page>
  );
}

export const getServerSideProps = async (context) => {
  const res = await axiosInstance.get('https://62b2e7cc20cad3685c9694ea.mockapi.io/api/lesson/lesson');
  const data = res.data;
  return {
    props: {
      data,
    },
  };
};
