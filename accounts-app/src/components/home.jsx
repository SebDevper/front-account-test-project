import { useState } from 'react'
import { useNavigate  } from 'react-router-dom';
import Token from '../states/token'

function Home() {
  let [loginEmail, setLoginEmail] = useState("")
  let [loginPassword, setLoginPassword] = useState("")

  let [registerName, setRegisterName] = useState("")
  let [registerEmail, setRegisterEmail] = useState("")
  let [registerPassword, setRegisterPassword] = useState("")

  let [loginLoading, setLoginLoading] = useState(false)
  let [registerLoading, setRegisterLoading] = useState(false)

  let [loginError, setLoginError] = useState(false)
  let [loginErrorMsg, setLoginErrorMsg] = useState("")

  let [registerError, setRegisterError] = useState(false)
  let [registerErrorMsg, setRegisterErrorMsg] = useState("")

  let [registerSucces, setRegisterSucces] = useState(false)

  let [validEmailLogin, setValidEmailLogin] = useState(true)
  let [validEmailRegister, setValidEmailRegister] = useState(true)

  let navigate = useNavigate();


  const login = async () => {
    if (!validEmailLogin){
      return
    }

    setLoginLoading(true)
    setLoginError(false)
    setLoginErrorMsg("")

    console.log('login')
    const loginData = {
      user_email: loginEmail,
      user_key: loginPassword
    }
    console.log(loginData)

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData)
    }
    console.log('login url', import.meta.env.VITE_LOGIN)
    let response = await fetch(import.meta.env.VITE_LOGIN, options)
    let data = await response.json()
    console.log(data)

    if (data.status === 0){
      Token.setToken(data.token)
      navigate('/banklist')
      return
    }

    if (data.status === -1){
      setLoginError(true)
      setLoginErrorMsg(data.message)
    }
    setLoginLoading(false)
  }

  const register = async () => {

    if (!validEmailRegister){
      return
    }

    console.log('register')
    setRegisterLoading(true)
    setRegisterError(false)
    setRegisterErrorMsg('')
    setRegisterSucces(false)

    const registerData = {
      user_name: registerName,
      user_email: registerEmail,
      user_key: registerPassword
    }

    console.log(registerData)

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(registerData)
    }

    let response = await fetch(import.meta.env.VITE_REGISTER, options)
    let data = await response.json()
    console.log(data)

    if (data.code === 0){
      setRegisterError(true)
      setRegisterErrorMsg(data.error)
    }

    if (data.code === 2){
      setRegisterSucces(true)
    }

    setRegisterLoading(false)

  }

  const handleChangeLogin = (event) => {
    const newValue = event.target.value
    const targetId = event.target.id
    if (targetId === 'loginEmail'){
      validateEmailLogin(newValue)
      setLoginEmail(newValue)
    }
    if (targetId === 'loginPassword')
      setLoginPassword(newValue)
  }

  const handleChangeRegister = (event) => {
    const newValue = event.target.value
    const targetId = event.target.id
    if (targetId === 'registerName')
      setRegisterName(newValue)
    if (targetId === 'registerEmail'){
      setRegisterEmail(newValue)
      validateEmailRegister(newValue)
    }
    if (targetId === 'registerPassword')
      setRegisterPassword(newValue)
  }

  const renderLoginButton = () => {
    if(loginLoading || registerLoading){
      return (
        <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none" type="button" disabled>
        Cargando...
        </button>
      )
    }

    return (
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button"
      onClick={login}>
      Iniciar sesión
      </button>
    )
  }


  const renderRegisterButton = () => {
    if(loginLoading || registerLoading){
      return (
        <button className="bg-green-800 text-white font-bold py-2 px-4 rounded" type="button">
          cargando...
        </button>
      )
    }

    return (
      <button className="bg-green-800 hover:bg-green-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button"
        onClick={register}>
        Crear cuenta
      </button>
    )
  }

  const renderLoginError = () => {
    if (loginError){
      return (<div className="text-rose-700 mb-2">{loginErrorMsg}</div>)
    }
  }

  const renderRegisterError = () => {
    if (registerError){
      return (<div className="text-rose-700 mb-2">{registerErrorMsg}</div>)
    }
  }

  const renderRegisterSuccess = () => {
    if (registerSucces){
      return (<div className="text-lime-800 mb-2">Usuario Ingresado correctamente</div>)
    }
  }

  const renderLoginEmailError = () => {
    if (validEmailLogin){
      return
    }

    return (
      <div className="text-rose-700 mb-2">Email no válido</div>
    )
  }

  const renderRegisterEmailError = () => {
    if (validEmailRegister){
      return
    }

    return (
      <div className="text-rose-700 mb-2">Email no válido</div>
    )
  }

  const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  const validateEmailLogin = (newEmail) => {
    if(newEmail && newEmail.match(isValidEmail)){
      setValidEmailLogin(true)
    }else{
      setValidEmailLogin(false)
    }
  }

  const validateEmailRegister = (newEmail) => {
    if(newEmail && newEmail.match(isValidEmail)){
      setValidEmailRegister(true)
    }else{
      setValidEmailRegister(false)
    }
  }

  return (
    <>
      <h1 className="text-3xl font-bold my-5 text-center">App cuentas test 🏦</h1>
      <div className="w-full flex justify-center">
        <div className="w-full md:w-full lg:w-8/12 xl:w-6/12 2xl:w-3/12">
          <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h2 className="block text-gray-900 text-2xl font-bold mb-2">Inciar sesión</h2>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="loginEmail">
                Correo
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="loginEmail" type="text" placeholder="example@mymail.com"
                value={loginEmail}
                onChange={handleChangeLogin}/>
            </div>
            {renderLoginEmailError()}
            <div className="mb-2">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="loginPassword">
                Contraseña
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="loginPassword" type="password" placeholder="******************"
                value={loginPassword}
                onChange={handleChangeLogin}/>
            </div>
            {renderLoginError()}
            <div className="flex items-center justify-between">
              {renderLoginButton()}
            </div>
          </form>
        </div>
      </div>

      <div className="w-full flex justify-center">
        <div className="w-full md:w-full lg:w-8/12 xl:w-6/12 2xl:w-3/12">
          <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h2 className="block text-gray-900 text-2xl font-bold mb-2">Crear cuenta</h2>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="registerName">
                Nombre
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="registerName" type="text" placeholder="nombre"
                value={registerName}
                onChange={handleChangeRegister}/>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="registerEmail">
                Mail
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="registerEmail" type="text" placeholder="example@mymail.com"
                value={registerEmail}
                onChange={handleChangeRegister}/>
            </div>
            {renderRegisterEmailError()}
            <div className="mb-2">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="registerPassword">
                Contraseña
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="registerPassword" type="password" placeholder="******************"
                value={registerPassword}
                onChange={handleChangeRegister}/>
            </div>
            <div>
              {renderRegisterError()}
              {renderRegisterSuccess()}
            </div>
            <div className="flex items-center justify-between">
              {renderRegisterButton()}
            </div>
          </form>
        </div>
      </div>

    </>
  )
}

export default Home
