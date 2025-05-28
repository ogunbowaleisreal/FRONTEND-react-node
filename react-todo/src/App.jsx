import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom"
import Home from './pages/Home'
import Login from './pages/login'
import Register from './pages/register'
import Notfound from './pages/notfound'
import ProtectedRoute from './components/ProtectedRoute'
import React from "react"

function Registerlogout(){
    return <Register/>
}

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path = '/' element = {<ProtectedRoute> <Home/> </ProtectedRoute>}/>
        <Route path = '/login' element = {<Login/>}/>
        <Route path= '/register' element = {<Registerlogout/>}/>
        <Route path= '*' element = {<Notfound/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
