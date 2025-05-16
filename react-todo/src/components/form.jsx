import React, { useState } from 'react'
import {useNavigate } from 'react-router-dom'
import api from '../api'

function Form({route,method}) {

  const [username, setusername] = useState('')
  const [password, setpassword] = useState('')
  const navigate = useNavigate();
  const name = method == 'login' ? 'login': 'register'

  const formSubmission = async(e)=>{
    e.preventDefault()
    try{
        const response = await api.post(route,{"username": username ,
        "password": password })
        
    if(name == 'login'){  
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
    <form onSubmit={formSubmission}>
      <h1>{name}</h1>
      <input type="text" onChange={(e)=>{setusername(e.target.value)}}
       value={username} placeholder='username' />
      <input type="password" onChange={(e)=>{setpassword(e.target.value)}} 
      value={password}  placeholder='password' />
      <button type='submit'> {name.toUpperCase()}</button>
    </form>
  )
}

export default Form