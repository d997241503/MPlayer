import axios from 'axios'

var instance = axios.create({
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 30000,
  baseURL: 'http://localhost:3000'
})

export default instance