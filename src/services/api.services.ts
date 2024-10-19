import axios from "axios";

const prod: string = "https://api.eayni.info/admin";
// const dev: string = "http://localhost:5000/";
const axiosApiInstance = axios.create({
  // baseURL: import.meta.env.REACT_APP_BASE_URL,
  baseURL: prod,
  headers: {
    Authorization: `Bearer ${getCookie("_auth")}`,
  },
});

function getCookie(key: string) {
  const b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
  return b ? b.pop() : "";
}
export default axiosApiInstance;
