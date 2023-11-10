import axios from 'axios';

const axiosClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}`
})

// Add a request interceptor (will be called before each request)
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('ACCESS_TOKEN');
  // console.log('interceptor token', token);
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});


// Add a response interceptor (will be called after each response, before sending to the calling component)
axiosClient.interceptors.response.use((response) => {
    return response;
}, (error) => {
    const {response} = error;
    if(response.status === 401) {
        // if user is unauthorized, remove the access token
        localStorage.removeItem('ACCESS_TOKEN');
    }
    throw error;
})
export default axiosClient;
