import axios from 'axios';
import decode from 'jwt-decode';
// ----------------------------------------------------------------------
const getToken = () => {
  if (typeof window !== 'undefined') {
    return JSON.parse(localStorage.getItem('recoil-persist'))?.authentication?.accessToken || '';
  }
};
const setToken = (token) => {
  if (typeof window !== 'undefined') {
    const authLocalData = JSON.parse(localStorage.getItem('recoil-persist'));
    localStorage.setItem(
      'recoil-persist',
      JSON.stringify({ ...authLocalData, authentication: { ...authLocalData.authentication, accessToken: token } })
    );
  }
};
const axiosInstance = axios.create({
  baseURL: process.env.HOST_API_KEY || '',
  timeout: 60000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    config.headers = {
      ...(getToken() && { Authorization: `Bearer ${getToken()}` }),
    };
    const now = new Date();
    const payload = getToken() && decode(getToken());
    if (payload && payload.exp * 1000 < now.getTime() && !config._retry) {
      config._retry = true;
      try {
        const res = await axios({
          method: 'POST',
          data: {
            _id: payload.sub,
            role: payload.role,
          },
          url: `${process.env.HOST_API_KEY}/refresh-token`,
          withCredentials: true,
        });
        if (res?.code) {
          return console.error(res?.message);
        }
        const newToken = res.data.accessToken;
        setToken(newToken);
        config.headers = {
          ...(newToken && { Authorization: `Bearer ${newToken}` }),
        };
      } catch (error) {
        console.log(error);
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;
