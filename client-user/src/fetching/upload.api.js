import app from 'src/utils/feathers';

export const cloudinaryUpload = (data) => {
  return app.service('upload').create(data);
};
