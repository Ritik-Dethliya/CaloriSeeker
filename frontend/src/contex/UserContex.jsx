import { useContext ,useEffect,useReducer,createContext} from "react";
import axios from 'axios'
import { useState } from "react";

export const UserContex=createContext()

const UserContexProvider=({children})=>{
    const [userData,setUserdata]=useState([])
    const [isLogin,setLogin]=useState(false)
    const [aiReport,setAiReport]=useState(null)
    const [resultArray,setResultArray]=useState([])
    const [healthStander,setHealthStander]=useState({
        BMR:1600,
        activityFactor:1.375,
        TDEE:2200,
        goal:"normal"
    })
    useEffect(()=>{
        try {
            let token=localStorage.getItem('caloritoken')
            if(!token)return
            setLogin(true)
        } catch (error) {
            console.log(error)
        }
    },[])
    useEffect(()=>{
        if(!isLogin)return
        getUserData()
    },[isLogin])

    async function getUserData(){
        try {
            let token=localStorage.getItem('caloritoken')
            console.log(token)
            if(!token)return console.log("Token not Present")
            let res=await axios.get("http://localhost:8000/user/userdetails",{
                headers:{
                    "Content-Type": "application/json",
                    "Authorization":`Bearer ${token}`
                },    
            })
            
            setUserdata(res.data.user)
            console.log(res.data.user)
        } catch (error) {
            setLogin(false)
            console.log(error)
        }
    }
    return(
        <UserContex.Provider value={{userData,aiReport,setAiReport,setUserdata,isLogin,setLogin,healthStander,resultArray,setResultArray}}>
            {children}
        </UserContex.Provider>
    )
}

export default UserContexProvider