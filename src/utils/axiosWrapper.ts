import { message } from 'antd'
import axios from 'axios'
import { deleteCookie, getCookie } from 'cookies-next'
import router from 'next/router'

const defaultOptions = {
  baseURL: 'https://node-js-fpt-wallet.herokuapp.com/',
  headers: {
    'Content-Type': 'application/json',
  },
}

const axiosWrapper = axios.create(defaultOptions)

// Set the AUTH token for any request
axiosWrapper.interceptors.request.use(async (config) => {
  const token = getCookie('accessToken')

  config.headers.Authorization = token ? `Bearer ${token}` : ''

  return config
})

axiosWrapper.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log({ error })
    if (error.response.status === 401) {
      message.error('Your session has expired!')
      deleteCookie('accessToken')
      router.push('/')
    } else {
      return Promise.reject(error)
    }
  }
)

export default axiosWrapper
