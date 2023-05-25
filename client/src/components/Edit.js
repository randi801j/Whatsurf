import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { useNavigate,useParams } from 'react-router-dom';

const EditBreak =(props)=>{

    const {id}= useParams()
    const navigate = useNavigate()
    const [beachBreak,setBeachBreak] = useState({
        name: '',
        temperature: '', 
        waveHeight:'',
        windDirection: '',
        notes: '',
    })

    const [errors,setErrors]= useState({})
    const[oneBreak,setOneBreak]= useState({})

    const changeHandler = (e)=>{
        setOneBreak({...beachBreak,[e.target.name]: e.target.value})
    }

    useEffect(()=>{
        axios.get(`http://localhost:8080/api/oneBreak/${id}`)
            .then((res)=>{
                setBeachBreak(res.data)
            })
            .catch((err)=>{
                console.log(err);
            })
    },[]);

    const submitHandler = (e)=>{
        e.preventDefault();
        axios.put(`http://localhost:8080/api/updatebreak/${id}`,beachBreak)
            .then((res)=>{
                console.log(res);
                navigate('/')
            })
            .catch((err)=>{
                console.log(err);
                setErrors(err.response.data.errors)
            })
    }

    return(
        <div>
            <h2>WhatSurf</h2>
            <h1> Edit</h1>
            <form onSubmit= {submitHandler}> 
                <label >Break Name:</label>
                <input type= 'text' onChange={changeHandler} value={beachBreak.name} name='name'/>
                {
                    errors.name?
                    <p>{errors.name.message}</p>: null
                }
                <label >Break Temperature:</label>
                <input  type= 'text' onChange={changeHandler} value={beachBreak.temperature} name='temperature'/>
                {
                    errors.temperature?
                    <p >{errors.temperature.message}</p>: null
                }
                <label>Break Wave Height:</label>
                <input  type= 'text' onChange={changeHandler} value={beachBreak.waveHeight} name='waveHeight'/>
                {
                    errors.waveHeight?
                    <p >{errors.windDirection.message}</p>: null
                }
                <label>Wind Direction:</label>
                <input  type= 'text' onChange={changeHandler} value={beachBreak.windDirection} name='windDirection'/>
                {
                    errors.windDirection?
                    <p >{errors.windDirection.message}</p>: null
                }
                <label>Notes:</label>
                <input type= 'text' onChange={changeHandler} value={beachBreak.notes} name='notes'/>
                {
                    errors.notes?
                    <p >{errors.notes.message}</p>: null
                }
                <button>Edit Break</button>
            </form>
        </div>
    )
}

export default EditBreak;