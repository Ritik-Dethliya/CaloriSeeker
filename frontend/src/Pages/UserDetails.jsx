import { useState } from "react";
import Navbar from "../Components/Navbar";
import '../Style/userDetails.css'
const intialState={
    name:"",
    age:"",
    weigth:"",
    height:"",
    gender:'',
    goal:''
}
function UserDetails() {
    const [formState,setFromState]=useState(intialState)
    const handleSubmit=async(e)=>{
        e.preventDefault()
        const {weigth,height,gender,goal,name}=formState
        console.log(formState)
        if(
            weigth<=0 ||
            height<=0 ||
            gender=="" ||
            goal==""||
            name==""
            ){
                return alert("Please Enter Correct Details")
            }
        else{

            let option=formState;
            try {
                let token=localStorage.getItem('caloritoken')
                let res=await fetch("http://localhost:8000/user/updateuser",{
                    method:"PATCH",
                    headers:{
                        "Content-Type": "application/json",
                        "Authorization":`Bearer ${token}`
                    },
                    body:JSON.stringify(option)
                })
                if(res.ok){
                    console.log("update succful")
                }setFromState(intialState);
            } catch (error) {
                console.log(error)
            }
        }
    }
    const handleChange=(e)=>{
        const {name,value}=e.target
        setFromState({...formState,[name]:value})
    }
    return (  
        <>
            <Navbar/>
            <div className="detail-page-body">
            <div className="login-form">
                <h3 
                    style={{width:"100%",textAlign:"center"}}
                > Enter Your Details</h3>
                <form action="" className='form' onSubmit={handleSubmit}>
                    
                    <input 
                        className='inpute' 
                        type="text" 
                        name="name" 
                        placeholder='Enter Your Name' 
                        value={formState.name}
                        onChange={handleChange}
                    />
                    <input 
                        className='inpute' 
                        type="text" 
                        name="age" 
                        placeholder='Enter Your age in Year' 
                        value={formState.age}
                        onChange={handleChange}
                    />
                    <input 
                        className='inpute' 
                        type="number" 
                        min={0} 
                        name="weigth" 
                        value={formState.weigth}
                        required 
                        placeholder="Enter Your weigth in kg" 
                        onChange={handleChange}
                    />
                    <input 
                        className='inpute' 
                        type="number" 
                        min={0} name="height" 
                        value={formState.height}
                        placeholder='Enter Your Height in Cms' 
                        onChange={handleChange}
                    />
                    <select 
                        name="gender" 
                        className="gola-selection"
                        onChange={handleChange}
                        value={formState.gender}
                    >
                        <option value="">Select your Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                    <select 
                        name="goal" 
                        className="gola-selection"
                        onChange={handleChange}
                        value={formState.goal}
                    >
                        <option value="">Select your Goal</option>
                        <option value="gainWeigth">Gain Weight</option>
                        <option value="loseWeigth">Loose Weigth</option>
                        <option value="normal">Normal</option>
                    </select>
                    <div className="btn-container">
                         <button type='submit' className='update-btn'>Save</button>
                    </div>
                </form>    
            </div>
        </div>
        </>
    );
}

export default UserDetails;