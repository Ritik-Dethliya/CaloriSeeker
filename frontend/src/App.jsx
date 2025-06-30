import { useState } from 'react'
import LoginPage from './Pages/Login'
import Home from './Pages/Home'
import {  Route, Routes } from 'react-router-dom'
import UserDetails from './Pages/UserDetails'
import SignInPage from './Pages/Signin'
import UserPage from './Pages/UserPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/user' element={<UserPage/>}/>
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/signin' element={<SignInPage/>}/>
      <Route path='/update/userDetail' element={<UserDetails/>}/>
    </Routes>
  )
}

export default App
