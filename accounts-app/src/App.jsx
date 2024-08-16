import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Home from './components/home.jsx'
import Banks from './components/banks.jsx'
import BankList from './components/BankList.jsx'
import AccountList from './components/AccountList.jsx'
import Movements from './components/Movements.jsx'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/banks" element={<Banks />}/>
          <Route path="/banklist" element={<BankList />}/>
          <Route path="/accountList" element={<AccountList />}/>
          <Route path="/movements" element={<Movements />}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
