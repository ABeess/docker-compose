import app from 'src/utils/feathers';

export const sendVerifyCode = (data) => {
  return app.service('mailer').create(data);
};
export const checkCode = ({ where }) => {
  return app.service('mailer').find({
    query: {
      ...where,
    },
  });
};
