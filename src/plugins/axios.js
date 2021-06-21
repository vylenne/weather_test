import axios from 'axios'

export const $http = axios.create({
  baseURL: `${process.env.VUE_APP_ROOT_API}`,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})
