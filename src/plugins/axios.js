import axios from 'axios'

const $http = axios.create({
  baseURL: `${process.env.BASE_URL}`,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

$http.interceptors.response.use((response) => {}, error => {
  console.log(error)
  switch (error.response.status) {
    case 500:
      console.log('The server encountered an unexpected condition which prevented it from fulfilling the request.')
    case 400:
      console.log('The request could not be understood by the server due to incorrect syntax.')
    case 403:
      console.log('Unauthorized request. The client does not have access rights to the content.')
    case 404:
      console.log('The server can not find the requested resource.')
    default:
      console.log('Unknown error!')
  }
  return Promise.reject(error)
})

export default $http