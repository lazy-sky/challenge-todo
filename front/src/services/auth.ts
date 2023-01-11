import axios from 'axios'

const baseUrl = 'http://localhost:8080'

export const signUp = (email: string, password: string) => {
  axios.post(`${baseUrl}/users/create`, { email, password })
}

export const login = (email: string, password: string) => {
  axios.post(`${baseUrl}/users/login`, { email, password })
}
