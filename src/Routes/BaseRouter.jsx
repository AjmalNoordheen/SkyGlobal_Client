import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Signup from '../Components/Signup'
import LoginPage from '../Components/Login'
import Home from '../Components/Home'
import { useSelector } from 'react-redux'


function BaseRouter() {
  const token = useSelector((store)=>store.user.token)
  return (
   <Routes>
    <Route path='/' element={token?<Navigate to={'/home'}/>:<LoginPage/>}/>
    <Route path='/signup' element={<Signup/>}/>
    <Route path='/home' element={token?<Home/>:<Navigate to={'/'} />}/>
   </Routes>
  )
}

export default BaseRouter