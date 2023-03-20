import { AppError } from '@utils/AppError'
import axios, { AxiosRequestConfig } from 'axios'

const api = axios.create({
  baseURL: 'http://192.168.15.63:3333',
  headers: {
    Accept: 'application/json',
    'Content-type': 'application/json',
  },
})

api.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response && error.response.data) {
      return Promise.reject(new AppError(error.response.data.message))
    } else {
      return Promise.reject(error)
    }
  },
)

export { api }
