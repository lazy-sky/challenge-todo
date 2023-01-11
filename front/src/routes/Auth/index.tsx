import { useMemo, useState } from 'react'

import { signUp, login } from 'services/auth'

const Auth = () => {
  const [isLoginMode, setIsLoginMode] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const handleLoginModeToggle = () => {
    setIsLoginMode(false)
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
        // TODO: 홈페이지로 라우팅
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
      <form onSubmit={handleFormSubmit}>
        <input type='text' placeholder='email' value={email} onChange={handleEmailChange} />
        <input type='password' placeholder='password' value={password} onChange={handlePasswordChange} />
        {SubmitButton}
      </form>
      {isLoginMode && (
        <button type='button' onClick={handleLoginModeToggle}>
          아직 회원가입을 하지 않으셨나요?
        </button>
      )}
      {errorMessage.length > 0 && <p>{errorMessage}</p>}
    </div>
  )
}

export default Auth
