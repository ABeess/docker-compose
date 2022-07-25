import app from 'src/utils/feathers';

export const getAllFllowers = async ({ limit, page = 0, where }) => {
  const response = await app.service('flower').find({
    query: {
      ...where,
      $limit: limit,
      $skip: page * limit,
    },
  });
  return response;
};
