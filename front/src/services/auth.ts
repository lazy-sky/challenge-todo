import axios from 'axios'

const baseUrl = 'http://localhost:8080'

interface IAuthError {
  response: {
    data: {
      details: string
    }
  }
}

export const signUp = async (email: string, password: string) => {
  try {
    await axios.post(`${baseUrl}/users/create`, { email, password })
  } catch (error) {
    throw new Error((error as IAuthError).response.data.details)
  }
}

export const login = async (email: string, password: string) => {
  try {
    await axios.post(`${baseUrl}/users/login`, { email, password })
  } catch (error) {
    throw new Error((error as IAuthError).response.data.details)
  }
}
