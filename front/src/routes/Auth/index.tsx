import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { signUp, login } from 'services/auth'

const Auth = () => {
  const naviagte = useNavigate()
  const [isLoginMode, setIsLoginMode] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const handleLoginModeToggle = () => {
    setIsLoginMode((prev) => !prev)
  }

  const handleEmailChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setEmail(e.target.value)
  }

  const handlePasswordChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setPassword(e.target.value)
  }

  const handleFormSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()

    if (!isLoginMode) {
      signUp(email, password)
        .then(() => {
          setErrorMessage('')
          setIsLoginMode(true)
        })
        .catch((error) => {
          setErrorMessage(error.message)
        })
      return
    }

    login(email, password)
      .then(() => {
        setErrorMessage('')
        naviagte('/')
      })
      .catch((error) => {
        setErrorMessage(error.message)
      })
  }

  const SubmitButton = useMemo(() => {
    return <button type='submit'>{isLoginMode ? '로그인' : '회원가입'}</button>
  }, [isLoginMode])

  return (
    <div>
      <h2>{isLoginMode ? '로그인' : '회원가입'}</h2>

      <form onSubmit={handleFormSubmit}>
        <input type='text' placeholder='email' value={email} onChange={handleEmailChange} />
        <input type='password' placeholder='password' value={password} onChange={handlePasswordChange} />
        {SubmitButton}
      </form>

      <button type='button' onClick={handleLoginModeToggle}>
        {isLoginMode ? '아직 회원가입을 하지 않으셨나요?' : '이미 회원이신가요?'}
      </button>

      {errorMessage.length > 0 && <p>{errorMessage}</p>}
    </div>
  )
}

export default Auth
