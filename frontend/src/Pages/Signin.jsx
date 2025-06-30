import { Link, useNavigate } from 'react-router-dom';
import '../Style/signin.css'
import { useRef, useState } from 'react';
function SignInPage() {
    const navigate=useNavigate()
    const nameref=useRef('')
    const emailref=useRef('')
    const mobileref=useRef('')
    const passwordref=useRef('')
    const [errorMsg,setMsg]=useState(null)
    const handelSignin=async(e)=>{
        e.preventDefault()
       
        if(nameref.current.value=="" ||
            emailref.current.value=="" || 
            mobileref.current.value=="" ||
            passwordref.current.value==""
        ){
            return alert("Please fill All details")
        }
        let option={
            name:nameref.current.value,
            email:emailref.current.value,
            phone:mobileref.current.value,
            password:passwordref.current.value,
        }
        console.log(option)
        try {
            let res=await fetch("http://localhost:8000/user/signup",{
            method:"POST",
            headers: {
                "Content-Type": "application/json",
            },
            body:JSON.stringify(option)
            })
            let data=await res.json()
            if(!res.ok){
                console.log(data.msg)
                setMsg(data.msg)
            }else{
                navigate('/')
            }
            
        } catch (error) {
            console.log(error)
        }
        
    }
    return (  
        
        <div className="signin-page-body">
            <div className="signin-form">
                <h3 
                    style={{width:"100%",textAlign:"center"}}
                > User Sign-in</h3>
                <form action="" className='form' onSubmit={handelSignin}>
                    <input className='inpute' type="text" name="username" placeholder='Enter username' ref={nameref} required/>
                    <input className='inpute' type="email" name="email" required placeholder="Enter Your email"ref={emailref}  />
                    <input className='inpute' type="number" max={9999999999} placeholder='Enter mobile no.' ref={mobileref} required/>
                    <input className='inpute' type="password" name="password" placeholder='Enter Password' ref={passwordref} required/>
                    <div className="btn-container">
                         <button className='signin-btn'
                            type='submit'
                         >Sign-in</button>
                    </div>
                   <p className='create-account'>
                        <Link to='/login'
                            style={{
                                textDecoration:"none",
                                color:"white"
                            }}
                        >Already have Account</Link>
                   </p>
                   <p className='errormsg'>
                    {errorMsg && errorMsg}
                   </p>
                </form>    
            </div>
        </div>
    );
}

export default SignInPage;