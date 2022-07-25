import app from 'src/utils/feathers';

export const getAllCourse = async ({ limit, page = 0, where }) => {
  const response = await app.service('course-list').find({
    query: {
      ...where,
      $limit: limit,
      $skip: page * limit,
    },
  });
  return response;
};

export const getOneCourse = ({ id, where }) => {
  return app.service('course-list').get(id, {
    query: {
      ...where,
    },
  });
};
