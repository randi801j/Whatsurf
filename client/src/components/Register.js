import React, {useState} from 'react';
import axios from 'axios'
import{useNavigate,Link} from 'react-router-dom'
const Register = (props)=>{
    const navigate = useNavigate()
    const[user,setUser]=useState({
        userName:'',
        userLast:'',
        email:'',
        password:'',
        confirmPassword:''
    })
    const changeHandler = (e) => {
        setUser({...user,[e.target.name]:e.target.value})
    }

    //Submit Handler
    const submitHandler = (e)=>{
        e.preventDefault();
        axios.post('http://localhost:8080/api/register',user,{withCredentials:true})
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
            <form onSubmit={submitHandler}>
                <div>
                    <label>First Name:</label>
                    <input type ='text' onChange={changeHandler} value={user.userName} name='userName'></input>
                </div>
                <div>
                    <label>Last Name:</label>
                    <input type ='text' onChange={changeHandler} value={user.userLast} name='userLast'></input>
                </div>
                <div>
                    <label>Email:</label>
                    <input type ='text' onChange={changeHandler} value={user.email} name='email'></input>
                </div>
                <div>
                    <label>Password:</label>
                    <input type ='password' onChange={changeHandler} value={user.password} name='password'></input>
                </div>
                <div>
                    <label>Confirm Password:</label>
                    <input type ='password' onChange={changeHandler} value={user.confirmPassword} name='confirmPassword'></input>
                </div>
                <button>Register</button>
            </form>
            <Link to={'/login'}>Already Existing Account </Link>
        </div>
    )
}

export default Register;