import React, { useState } from 'react'
import {useNavigate } from 'react-router-dom'
import api from '../api'

function Form({route,method}) {

  const [username, setusername] = useState('')
  const [password, setpassword] = useState('')
  const [error, seterror]= useState(false)
  const navigate = useNavigate();
  const name = method == 'Login' ? 'Login': 'Register'

  const formSubmission = async(e)=>{
    e.preventDefault()
    try{
      if(!username || !password){
        seterror(true)
        navigate("/login")
        return
      }
        const response = await api.post(route,{"username": username,
        "password": password })
        
    if(name == 'Login'){  
     console.log(response.status)
    if(response.status== 200){
      navigate("/")
      return
    }
    seterror(true)
    navigate("/login")
    return
    }
    navigate("/login")
  }catch(err){
    seterror(true)
    console.log(err)

  }
}

  return (
    <div class= "min-h-screen flex w-full">
      <div class = "flex bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 min-h-screen w-full justify-center items-center relative">
      {error && <div class="absolute top-0 font-bold text-4xl bg-red-600 w-full text-center p-1" >Error</div>}
    <form class= "flex p-10 shadow-2xl w-md" onSubmit={formSubmission}>
      <div class= "grid w-full text-center">  
      <h1 class="text-4xl font-bold mb-5">{name}</h1>
      <input type="text" class="w-full mb-5 p-1 border" onChange={(e)=>{setusername(e.target.value)}}
       value={username} placeholder='username'/>
      <input  type="password" class="w-full mb-10 p-1 border" onChange={(e)=>{setpassword(e.target.value)}} 
      value={password}  placeholder='password'/>
      <button class = "bg-blue-600 p-2" type='submit'> {name.toUpperCase()}</button>
      {name == "Login" ? <p class = "text-blue-400 hover:cursor-default hover:underline" onClick={()=>{navigate("/register")}} >Register</p> : <p class= "text-blue-400 hover:cursor-default hover:underline" onClick={()=>{navigate("/login")}}>Already have an account ? Login instead </p>} 
      </div>
    </form>
    </div>
    </div>

  )
}

export default Form