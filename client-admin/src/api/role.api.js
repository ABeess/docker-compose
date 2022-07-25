import app from 'src/feathers';

export const getAllRole = () => {
  return app.service('role').find();
};
export const createRole = (data) => {
  return app.service('role').create(data);
};

export const patchRole = ({ id, data }) => {
  return app.service('role').patch(id, data);
};

export const singleDeleteRole = (id) => {
  return app.service('role').remove(id);
};
