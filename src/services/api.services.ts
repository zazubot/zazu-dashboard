import axios, { AxiosError, AxiosInstance } from 'axios'

const axiosApiInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('_auth')}`,
  },
}) as AxiosInstance

// Handle response interceptor
axiosApiInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Clear local storage
      // clearAllCookies()
    }
    return Promise.reject(error)
  }
)

export default axiosApiInstance
