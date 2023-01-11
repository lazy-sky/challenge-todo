import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { signUp, login } from 'services/auth'

// TODO:
// - 이메일과 비밀번호의 유효성 검사
//  - 이메일: 최소 @, . 포함
//  - 비밀번호: 8자 이상 입력
//  - 조건 불만족시 버튼 비활성화
// - 응답으로 받은 토큰 로컬 스토리지 저장
// - 다음 번에 로그인 시 토큰이 존재한다면 루트 경로로 리다이렉트
// - 토큰이 유효하지 않다면 사용자에게 알리고 로그인 페이지로 리다이렉트

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
