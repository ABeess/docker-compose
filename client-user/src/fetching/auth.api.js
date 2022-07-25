import app from 'src/utils/feathers';
import appSK from 'src/utils/feathersSocket';

export const login = (data) => {
  return appSK.authenticate({
    strategy: 'local',
    ...data,
    query: {
      $select: ['id', 'email'],
    },
  });
};
export const register = ({ data, checking = true }) => {
  return app.service('users').create(data, {
    query: { checking },
  });
};
export const getFromLocation = (location) => {
  return appSK.authentication.getFromLocation(location);
};
export const refreshToken = ({ payload, login = false }) => {
  return app.service('refresh-token').create(payload, {
    query: { login },
  });
};
export const removeRefreshToken = (userId) => {
  return app.service('refresh-token').remove(null, {
    query: { userId, logout: true },
  });
};
export const reAuthenticate = () => {
  return appSK.authentication.reAuthenticate();
};
export const logout = () => {
  return appSK.logout({
    strategy: 'jwt',
  });
};
