import app from 'src/utils/feathers';

export const getAllCourse = async ({ limit, page = 0, where }) => {
  const response = await app.service('course-meta').find({
    query: {
      ...where,
      $limit: limit,
      $skip: page * limit,
    },
  });
  return response;
};
