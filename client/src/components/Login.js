import React, {useState} from 'react';
import axios from 'axios';
import {useNavigate,Link} from 'react-router-dom'


const Login = (props)=> {
    const navigate = useNavigate
    const [userLogin,setUserLogin]= useState({
        email:'',
        password:''
    })

    const changeHandler = (e) => {
        setUserLogin ({... userLogin, [e.target.name]:e.target.value})
    }

    const loginHandler = (e) =>{
        e.preventDefault()
        axios.post('http://localhost:8080/api/login',userLogin,{withCredentials:true})
            .then((res)=>{
                console.log(res);
                navigate('/dashboard')
            })
            .catch((err)=>{
                console.log(err);
            })
    }

    return(
        <div>
            <h1>Log In </h1>
            <form onSubmit = {loginHandler} >
                <label>Email:</label>
                <input type="text" name="email" value={userLogin.email} onChange={changeHandler}></input>
                <lable>Password:</lable>
                <input type="password" name="password" value={userLogin.password} onChange={changeHandler}></input>
                <button classname='btn btn-dark mt-3'>Login</button> 
                <br/>
                <Link to= {'/'}>Register Account</Link>
            </form>
        </div>
    )
}

export default Login;