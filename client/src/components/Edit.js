import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { useNavigate,useParams,Link } from 'react-router-dom';

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

    const changeHandler = (e)=>{
        setBeachBreak({...beachBreak,[e.target.name]: e.target.value})
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
                navigate('/dashboard')
            })
            .catch((err)=>{
                console.log(err);
                setErrors(err.response.data.errors)
            })
    }

    const logout =()=> {
        axios.post('http://localhost:8080/api/logout',{},{withCredentials:true})
            .then((res)=>{
                navigate('/')
            })
            .catch((err) => {
                console.log(err);
            })
    }

    return(
        <div>
            <nav className="navbar navbar-expand-lg navbar-light" style={{backgroundColor: "#020887"}}>
                <div className="container-fluid">
                    <h1 className="text-white">What'Surf</h1>
                    <div className="collapse navbar-collapse d-flex justify-content-end" id="navbarNavAltMarkup">
                        {/* Insert nav-links here */}
                        <ul className="nav nav-tabs">
                            <li className="nav-item">
                                <Link to={'/dashboard'} className="nav-link" style={{color: "#C6EBBE"}}>Dashboard</Link>
                            </li>
                            <li className="nav-item">
                                <Link to={'#'} className="nav-link" style={{color: "#C6EBBE"}}>My Breaks</Link>
                            </li>
                            <li className="nav-item">
                                <Link to={'/createBreak'} className="nav-link" style={{color: "#C6EBBE"}}>Add Breaks</Link>
                            </li>
                            <li className="nav-item">
                                <button className="nav-link btn btn-link" style={{color: "#C6EBBE"}} onClick={logout}>Logout</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div className="container">
                <div className='d-flex justify-content-center'>
                    <form className='w-50 border border-dark mt-4 p-3' style={{backgroundColor: '#C6EBBE'}} onSubmit= {submitHandler}> 
                        <h1> Edit</h1>
                        <div className="mt-3">
                            <label className='form-label'>Break Name:</label>
                            <input className='form-control border border-dark' type= 'text' onChange={changeHandler} value={beachBreak.name} name='name'/>
                        </div>
                        {
                            errors.name?
                            <p>{errors.name.message}</p>: null
                        }
                        <div className="mt-2">
                            <label className='form-label'>Break Temperature:</label>
                            <input className='form-control border border-dark' type= 'number' onChange={changeHandler} value={beachBreak.temperature} name='temperature'/>
                        </div>
                        {
                            errors.temperature?
                            <p >{errors.temperature.message}</p>: null
                        }
                        <div className="mt-2">
                            <label className='form-label'>Break Wave Height:</label>
                            <input className='form-control border border-dark'  type= 'number' onChange={changeHandler} value={beachBreak.waveHeight} name='waveHeight'/>
                        </div>
                        {
                            errors.waveHeight?
                            <p >{errors.windDirection.message}</p>: null
                        }
                        <div className="mt-2">
                            <label className='form-label'>Wind Direction:</label>
                            <input className='form-control border border-dark'  type= 'text' onChange={changeHandler} value={beachBreak.windDirection} name='windDirection'/>
                        </div>
                        {
                            errors.windDirection?
                            <p >{errors.windDirection.message}</p>: null
                        }
                        <div className="mt-2">
                            <label className='form-label'>Notes:</label>
                            <input className='form-control border border-dark' type= 'text' onChange={changeHandler} value={beachBreak.notes} name='notes'/>
                        </div>
                        {
                            errors.notes?
                            <p >{errors.notes.message}</p>: null
                        }
                        <div className='mt-3 d-flex justify-content-end'>
                            <button className='btn' style={{backgroundColor: '#38369A', color: 'white'}}>Edit Break</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditBreak;