import axios from 'axios'

const AXIOS_CONFIG = {
  baseURL: 'http://localhost:8000/api/',
}

const axiosInstance = axios.create(AXIOS_CONFIG)

export default axiosInstance