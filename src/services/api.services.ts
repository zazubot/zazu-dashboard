import axios, { AxiosError, AxiosInstance } from 'axios'
import { clearAllCookies, getCookie } from './cookie.services'

const axiosApiInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    Authorization: `Bearer ${getCookie('_auth')}`,
  },
}) as AxiosInstance

// Handle response interceptor
axiosApiInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Clear local storage
      clearAllCookies()
    }
    return Promise.reject(error)
  }
)
export default axiosApiInstance
