import api from "../api"
import { useState , useEffect } from "react";
function Home(){
    const [todolist , settodos] = useState('')

    const gettodos = async()=>{
        try{
        const todos = api.get('/')
        if(todos){

        }
    }catch(err){
        
    }
    }
    return (
        <div>
            <p>Home</p>

        </div>
    )
}

export default Home;