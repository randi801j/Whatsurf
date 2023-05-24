import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { useNavigate,useParams } from 'react-router-dom';

const EditBreak =(props)=>{

    const {id}= useParams()
    const navigate = useNavigate()
    const [break,setBreak] = useState({
        name: '',
        temperature: '', 
        waveHeight:'',
        windDirection: '',
        notes: '',
    })

    const [errors,setErrors]= useState({})
    const[oneBreak,setOneBreak]= useState({})

    const changeHandler = (e)=>{
        setBreak({...break,[e.target.name]: e.target.value})
    }

    useEffect(()=>{
        axios.get(`http://localhost:8080/api/oneBreak/${id}`)
            .then((res)=>{
                setShelter(res.data)
            })
            .catch((err)=>{
                console.log(err);
            })
    },[]);

    const submitHandler = (e)=>{
        e.preventDefault();
        axios.put(`http://localhost:8080/api/updatebreak/${id}`,break)
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
                <input type= 'text' onChange={changeHandler} value={break.name} name='name'/>
                {
                    errors.name?
                    <p>{errors.name.message}</p>: null
                }
                <label >Break Temperature:</label>
                <input  type= 'text' onChange={changeHandler} value={break.temperature} name='temperature'/>
                {
                    errors.temperature?
                    <p >{errors.temperature.message}</p>: null
                }
                <label>Break Wave Height:</label>
                <input  type= 'text' onChange={changeHandler} value={break.waveHeight} name='waveHeight'/>
                {
                    errors.waveHeight?
                    <p >{errors.windDirection.message}</p>: null
                }
                <label>Wind Direction:</label>
                <input  type= 'text' onChange={changeHandler} value={break.windDirection} name='windDirection'/>
                {
                    errors.skillOne?
                    <p >{errors.skillOne.message}</p>: null
                }
                <label>Notes:</label>
                <input type= 'text' onChange={changeHandler} value={break.notes} name='notes'/>
                {
                    errors.skillTwo?
                    <p >{errors.skillTwo.message}</p>: null
                }
                <button>Edit Break</button>
            </form>
        </div>
    )
}

export default EditWave;