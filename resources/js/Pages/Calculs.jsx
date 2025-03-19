import axios from "axios";
import { useState,useEffect } from "react";
export default function Calculs (){

    const [data,setData] = useState(0)


        const [commands , setCommands] = useState([])

        useEffect(()=>{
         axios.get("/commands").then(res=>{
             setCommands(res.data.commands)
           })
        },[])

    axios.post(`http://127.0.0.2:8000/api/`,{
        data:commands
    }).then(res=>{
        setData(res.data.r_squared_adj)
        console.log("Python data: ",res.data)
    })

    return (
        <div class="min-h-screen mx-4 flex flex-col justify-center py-12 sm:px-6 lg:px-8">

        <div>R square adj: {data }</div>

      </div>
    );
}
