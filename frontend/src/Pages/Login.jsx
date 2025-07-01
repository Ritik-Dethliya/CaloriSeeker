import { Link, useNavigate } from 'react-router-dom';
import '../Style/login.css'
import { useReducer } from 'react';
import { useRef } from 'react';
import { useContext } from 'react';
import { UserContex } from '../contex/UserContex';
function LoginPage() {
    const navigate=useNavigate()
    const {setLogin}=useContext(UserContex)
    let emailref=useRef('')
    let passwordref=useRef('')
    const handellogin=async(e)=>{
        e.preventDefault()
        const option={
            email:emailref.current.value,
            password:passwordref.current.value
        }
        console.log(option)
        try {
            let res=await fetch("https://caloriseeker.onrender.com/user/login",{
            method:"POST",
            headers: {
                "Content-Type": "application/json",
            },
            body:JSON.stringify(option)
            })
            let data= await res.json()
            if(data.token){
                console.log(data.token)
                localStorage.setItem('caloritoken',data.token)
                setLogin(true)
                navigate('/')
            }
            if(!res.ok){
                console.log(data.msg)
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (  
        <div className="logi-page-body">
            <div className="welcome-image">
            </div>
            <div className="login-form">
                <h3 
                    style={{width:"100%",textAlign:"center"}}
                > User Form</h3>
                <form action="" className='form' onSubmit={handellogin}>
                    
                    
                    <input className='inpute' type="email" name="email" required placeholder="Enter Your email" ref={emailref}/>
                    <input className='inpute' type="password" name="password" placeholder='Enter Password' ref={passwordref}/>
                    <div className="rember-container">
                        <div className='checkbox'>
                            <input type="checkbox" name="" id="" className='checkbox'/>
                            rember me
                        </div>
                        <p>forget password</p>
                    </div>
                    <div className="btn-container">
                         <button className='login-btn'>Login</button>
                    </div>
                   <p className='create-account'>
                        <Link
                            to="/signin"
                            style={{textDecoration:"none",color:"white"}}
                        >Don`t have Account</Link>
                   </p>
                </form>    
            </div>
        </div>
    );
}

export default LoginPage;