import axios from 'axios';

const checkStatus = async (token) => {
  const options = {
    method: 'GET',
    url: `http://54.179.77.193/submissions/${token}`,
    params: { base64_encoded: 'true', fields: '*' },
  };
  try {
    let response = await axios.request(options);
    let statusId = response.data.status?.id;

    // Processed - we have a result
    if (statusId === 1 || statusId === 2) {
      // still processing
      setTimeout(() => {
        checkStatus(token);
      }, 2000);
      return response;
    } else {
      // setOutput(response.data.stdout);
      console.log('response.data', response.data);
      return response;
    }
  } catch (err) {
    console.log('err', err);
  }
};

export const compile = async (data) => {
  const options = {
    method: 'POST',
    url: 'http://54.179.77.193/submissions',
    params: { base64_encoded: 'true', fields: '*' },
    headers: {
      'content-type': 'application/json',
      'Content-Type': 'application/json',
      // 'X-RapidAPI-Host': process.env.REACT_APP_RAPID_API_HOST,
      // 'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
    },
    data,
  };

  try {
    const response = await axios.request(options);
    console.log('res.data', response.data);
    const token = response.data.token;
    return checkStatus(token);
  } catch (error) {
    console.log('error', error);
  }

  // axios
  //   .request(options)
  //   .then(function (response) {
  //     console.log('res.data', response.data);
  //     const token = response.data.token;
  //     return checkStatus(token);
  //   })
  //   .catch((err) => {
  //     let error = err.response ? err.response.data : err;
  //     // get error status
  //     let status = err.response.status;
  //     console.log('status', status);
  //     if (status === 429) {
  //       console.log('too many requests', status);
  //     }
  //     console.log('catch block...', error);
  //   });
};
