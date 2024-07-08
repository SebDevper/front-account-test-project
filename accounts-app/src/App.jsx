import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  let [loginEmail, setLoginEmail] = useState("")
  let [loginPassword, setLoginPassword] = useState("")

  let [registerName, setRegisterName] = useState("")
  let [registerEmail, setRegisterEmail] = useState("")
  let [registerPassword, setRegisterPassword] = useState("")


  const login = async () => {
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

    let response = await fetch('http://127.0.0.1:8000/login', options)
    let data = await response.json()
    console.log(data)
  }

  const register = async () => {
    console.log('register')
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

    let response = await fetch('http://127.0.0.1:8000/create-user', options)
    let data = await response.json()
    console.log(data)

  }

  const handleChangeLogin = (event) => {
    const newValue = event.target.value
    const targetId = event.target.id
    if (targetId === 'loginEmail')
      setLoginEmail(newValue)
    if (targetId === 'loginPassword')
      setLoginPassword(newValue)
  }

  const handleChangeRegister = (event) => {
    const newValue = event.target.value
    const targetId = event.target.id
    if (targetId === 'registerName')
      setRegisterName(newValue)
    if (targetId === 'registerEmail')
      setRegisterEmail(newValue)
    if (targetId === 'registerPassword')
      setRegisterPassword(newValue)
  }

  return (
    <>
      <h1 className="text-3xl font-bold my-5">App cuentas test 🏦</h1>
      <div className="w-full flex justify-center">
        <div className="w-full md:w-full lg:w-8/12 xl:w-6/12 2xl:w-3/12">
          <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h2 className="block text-gray-900 text-2xl font-bold mb-2">Inciar sesión</h2>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" for="loginEmail">
                Correo
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="loginEmail" type="text" placeholder="example@mymail.com" 
                value={loginEmail}
                onChange={handleChangeLogin}/>
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" for="loginPassword">
                Contraseña
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="loginPassword" type="password" placeholder="******************"
                value={loginPassword}
                onChange={handleChangeLogin}/>
            </div>
            <div className="flex items-center justify-between">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button"
              onClick={login}>
                Iniciar sesión
              </button> 
            </div>
          </form> 
        </div>
      </div>
      
      <div className="w-full flex justify-center">
        <div className="w-full md:w-full lg:w-8/12 xl:w-6/12 2xl:w-3/12">
          <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h2 className="block text-gray-900 text-2xl font-bold mb-2">Crear cuenta</h2>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" for="registerName">
                Nombre
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="registerName" type="text" placeholder="nombre" 
                value={registerName}
                onChange={handleChangeRegister}/>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" for="registerEmail">
                Mail
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="registerEmail" type="text" placeholder="example@mymail.com" 
                value={registerEmail}
                onChange={handleChangeRegister}/>
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" for="registerPassword">
                Contraseña
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="registerPassword" type="password" placeholder="******************"
                value={registerPassword}
                onChange={handleChangeRegister}/>
            </div>
            <div className="flex items-center justify-between">
              <button className="bg-green-800 hover:bg-green-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button"
              onClick={register}>
                Crear cuenta
              </button> 
            </div>
          </form> 
        </div>
      </div>

    </>
  )
}

export default App
