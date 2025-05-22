import api from "../api"
import { useState , useEffect } from "react";
import { Navigate } from "react-router-dom";
import React from "react";

function Home(){
    const [todolist , settodos] = useState(null);
    const [auth, setauth] = useState(null);
    const [newtodo, setnewtodo] = useState('')
    const [checked, setchecked]= useState(null)
    const [error, seterror]= useState(false)

    const handleClick =async()=>{
        try{
            const response = await api.post("/todo",{"item":newtodo})
            if(response.status == 200){
                setnewtodo('')
                await gettodos()
                return
            }
        }catch(err){
            console.log(err)
        }
    }

    const updateCompleted=async(key,completedStatus)=>{
        try {
            const newChecked = !completedStatus
            const response = await api.patch("/todo",{"id":key,"completed":newChecked})
            if(response.status== 200){
                await gettodos()
                return
            }
        } catch (error) {
            console.log(error)
            seterror()
        }
    }

    const handleDelete=async(key)=>{
        try{
            const response = await api.delete("/todo",{data:{
                "id": key
            }})  
            if(response.status ==200){
                await gettodos()
                return
            }         
        }catch(err){
            console.log(err)
            return 
        }
    }

    const gettodos = async()=>{
        try{
        const response = await api.get('/todo')
        const todos = await response.data
        console.log(todos)
        if(todos){
            settodos(todos)
            setauth(true)
            return
        }

    }catch(err){
        seterror(true)
       setauth(false)
       console.log(err) 
       return
    }
    };
    useEffect(()=>{gettodos()},[])
    if(auth == null){
        return <div> loading....</div>
    }
    return (auth ? 
        <div class=" bg-gray-800 min-h-screen">
        <div class= "p-4 grid gap-6 text-white">
           {error ?? <div>error</div>}
            <div class="grid p-2 gap-2 justify-center">
            <h1 class="text-2xl font-bold ">My Todos</h1>
            <div class="flex gap-2">
            <label for="note"/>
            <input class="p-1 border-2 border--white rounded-sm"placeholder="new todo" id = "note" type="text"onChange={(e)=>{setnewtodo(e.target.value)}} value={newtodo}/>
            <button class= "border-2 border-white rounded-sm p-2" onClick={handleClick}>Add new todo</button>
            </div>
            </div>
            <ul class="grid gap-2 p-2 ">
                {todolist.map((item)=>(<li class="gap-1 flex " key={item._id} >{item.item} 
                    <input type= "checkbox" onChange={()=>{updateCompleted(item._id,item.completed)}}
                 checked={item.completed}/>
                <button class = "border-1 border-black rounded-2x1 ml-auto "onClick={()=>{handleDelete(item._id)}}><i class="fa-solid fa-trash"></i></button></li>))}
            </ul>
        </div>
        </div>
         : <Navigate to= "/login"/>
)
};

export default Home;