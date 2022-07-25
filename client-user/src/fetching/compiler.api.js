import axios from 'axios';

const getResult = async (token) => {
  const options = {
    method: 'GET',
    url: `${process.env.REACT_APP_RAPID_API_URL}/${token}`,
    params: { base64_encoded: 'true', fields: '*' },
  };
  const response = await axios.request(options);
  return response.data;
};

export const compile = async (data) => {
  const options = {
    method: 'POST',
    url: process.env.REACT_APP_RAPID_API_URL,
    params: { base64_encoded: 'true', fields: '*' },
    headers: {
      'content-type': 'application/json',
      'Content-Type': 'application/json',
    },
    data,
  };

  try {
    const getToken = await axios.request(options);
    const token = getToken.data.token;
    const response = await getResult(token);
    const statusId = response.status?.id;
    console.log(statusId);
    if (statusId === 1 || statusId === 2) {
      return new Promise((resolve, _reject) => {
        setTimeout(() => {
          resolve(getResult(token));
        }, 2000);
      });
    } else {
      return response;
    }
  } catch (err) {
    const error = err?.response ? err?.response.data : err;
    // get error status
    let status = err?.response?.status;
    if (status === 429) {
      console.log('too many requests', status);
    }
    console.log('catch block...', error);
  }
};
