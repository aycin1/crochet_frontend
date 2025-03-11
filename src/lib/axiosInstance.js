export const axiosInstance = axios.create();

axiosInstance.interceptors.response.use(
  async (response) => {
    if (response.statusCode === 401) {
      try {
        await axios.get("/refresh");
        return axiosInstance(response.config);
      } catch (error) {
        console.log(error);
      }
    }
    return response;
  },
  async (error) => {
    return Promise.reject(error);
  }
);
