import {Navigate, useNavigate} from 'react-router-dom';
import api from '../api';
import { useState, useEffect } from 'react';
import React from 'react';

function ProtectedRoute({children}){

        const [authorized, setauthorized] = useState(null)

    const auth= async ()=>{
        try{     
        const response = await api.get('/verify')
            if(response.status == 200){
                setauthorized(true)
                return
            }else{
                setauthorized(false)
                return
            }
    }catch(err){
        console.log('just checking')
        console.log(err)
        setauthorized(false)
    }
    }
    useEffect(()=>{auth()},[])

        if(authorized == null){
        return <div> ......loading</div>
    }
    return( authorized ? children : <Navigate to ='/login'/>)
}

export default ProtectedRoute