import axios from 'axios'

const axiosApiInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    Authorization: `Bearer ${getCookie('_auth')}`,
  },
})

function getCookie(key: string) {
  const b = document.cookie.match('(^|;)\\s*' + key + '\\s*=\\s*([^;]+)')
  return b ? b.pop() : ''
}
export default axiosApiInstance
