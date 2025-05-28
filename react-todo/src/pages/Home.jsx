import api from "../api"
import { useState , useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import React from "react";

function Home(){
    const [todolist , settodos] = useState(null);
    const [auth, setauth] = useState(null);
    const [newtodo, setnewtodo] = useState('')
    const [error, seterror]= useState(false)
    const [edit, setedit]= useState(false)
    const [Id,setId] = useState("")

    const navigate = useNavigate()

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

    const logout =async()=>{
        try{
            const response = await api.get("/logout")
            if(response.status== 200){
                navigate("/login")
            }
        }catch(err){
            navigate('/login')
        }
    }

    const updateCompleted=async({key,completedStatus,item})=>{
        try {
            const newitem = item
            if(newitem){
                setnewtodo(item)   
            const response = await api.patch("/todo",{"id":key,"item":newitem})
            if(response.status== 200){
                setedit(false)
                setnewtodo("")
                await gettodos()
                return
            }
            }
            const newChecked = !completedStatus
            const response = await api.patch("/todo",{"id":key,"completed":newChecked})
            if(response.status== 200){
                await gettodos()
                return
            }
        } catch (error) {
            console.log(error)
            setedit(false)
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
        <div class="grid font-sans justify-center items-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 min-h-screen w-full relative">
            <div class = "absolute right-0 p-10 bottom-0"><i onClick = {logout} class="fa-solid fa-right-from-bracket rounded-sm hover:border p-1"></i></div>
        <div class="p-4 gap-4 grid w-md shadow-2xl text-black rounded-md">
           {error ?? <div>error</div>}
            <div class="grid p-1 gap-1 justify-center items-center">
            <h1 class="text-2xl font-bold text-center">My Todos</h1>
            <div class="flex gap-3">
            <label for="note"/>
            <input class="p-1 border-1 border-black rounded"placeholder="New todo" id = "note" type="text"onChange={(e)=>{setnewtodo(e.target.value)}} value={newtodo}/>
            {edit== false ?<button class= "font-bold border border-black rounded-sm p-1" onClick={handleClick}>Add +</button>:
            <button class= "font-bold border border-black rounded-sm p-1" onClick={()=>{updateCompleted({key:Id,item:newtodo})}}>Edit</button>}
            </div>
            </div>
            <div class= "w-full text-left font-bold font-sans">
            <ul class="list-disc grid gap-3">
                {todolist.map((item)=>(
                <li class="flex p-2" key={item._id} >{item.item}
                <div class="ml-auto flex gap-1">
                <input type= "checkbox" class="" onChange={()=>{updateCompleted({key:item._id,completedStatus:item.completed})}}checked={item.completed}/>
                <button><i onClick={()=>{
                    setId(item._id)
                    setedit(true)
                    setnewtodo(item.item)
                    return
                    }} class="fa-solid fa-pen-to-square"></i></button>
                <button class = "ml-auto"onClick={()=>{handleDelete(item._id)}}><i class="fa-solid fa-trash"></i></button>
                </div>
                </li>
            ))}
            </ul>
            </div>
        </div>
        </div>
         : <Navigate to= "/login"/>
)
};

export default Home;