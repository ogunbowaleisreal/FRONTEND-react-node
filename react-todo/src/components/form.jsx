import React, { useState } from 'react'
import {useNavigate } from 'react-router-dom'
import api from '../api'

function Form({route,method}) {

  const [username, setusername] = useState('')
  const [password, setpassword] = useState('')
  const navigate = useNavigate();
  const name = method == 'Login' ? 'Login': 'register'

  const formSubmission = async(e)=>{
    console.log("got here")
    e.preventDefault()
    try{
        const response = await api.post(route,{"username": username ,
        "password": password })
        
    if(name == 'Login'){  
     console.log(response.status)
    if(response.status== 200){
      navigate("/")
      return
    }
    navigate("/login")
    return
    }
    navigate("/login")
  }catch(err){
    console.log(err)
  }
}
  return (
    <div class= "min-h-screen relative">
    <form class = "grid gap-4 justify-center shadow-2xl absolute top-50 left-80 p-10 " onSubmit={formSubmission}>
      <h1 class="text-4xl font-bold ">{name}</h1>
      <input type="text" onChange={(e)=>{setusername(e.target.value)}}
       value={username} placeholder='username' />
      <input type="password" onChange={(e)=>{setpassword(e.target.value)}} 
      value={password}  placeholder='password' />
      <button class = "bg-blue-600" type='submit'> {name.toUpperCase()}</button>
    </form>
    </div>
  )
}

export default Form