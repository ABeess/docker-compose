import app from 'src/utils/feathers';

export const patchUser = ({ id = null, data, checking = true, isAuthenticated = false, verify = true }) => {
  return app.service('users').patch(id, data, {
    query: { checking, isAuthenticated, verify, email: data.email },
  });
};
export const getUserFollowers = ({ id, limit, page = 0, where }) => {
  return app.service('users').find({ query: { followings: id, $limit: limit, $skip: page * limit, ...where } });
};
export const getUserFriends = ({ id, limit, page = 0, where }) => {
  return app.service('friendship').find({
    query: {
      $and: [{ $or: [{ requestId: id }, { receiveId: id }] }, { status: 'accepted' }],
      $limit: limit,
      $skip: page * limit,
      ...where,
    },
  });
};
