import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const BreakForm = (props) => {


    const [newBreak, setNewBreak] = useState({
        name: "",
        temperature: "",
        waveHeight: "",
        windDirection: "",
        notes: ""
    })

    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();
    const { id } = useParams()

    const changeHandler = (e) => {
        setNewBreak({ ...newBreak, [e.target.name]: e.target.value })
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

    const createHandler = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8080/api/newBreak", {
            name: newBreak.name,
            temperature: newBreak.temperature,
            waveHeight: newBreak.waveHeight,
            windDirection: newBreak.windDirection,
            notes: newBreak.notes,
        }, { withCredentials: true })
            .then(response => {
                console.log("success")
                console.log(response.data)
                navigate(`/dashboard`)
            })
            .catch(err => {
                console.log(err.config.data)
                console.log("err is:", err)
                const errorResponse = err.response;
                console.log("error response sends back:", errorResponse)
                const errorArray = [];
                for (const key of Object.keys(errorResponse)) {
                    errorArray.push(errorResponse[key].message)
                }
                setErrors(errorArray)
            })
    }
    return (
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
                                <Link to={'#'} className="nav-link active" aria-current="page" style={{color: "#020887", backgroundColor: "#C6EBBE"}}>Add Breaks</Link>
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
                    <form className='w-50 border border-dark mt-4 p-3' style={{backgroundColor: '#A9DBB8'}} onSubmit={(e) => createHandler(e)}>
                        <h2>Create your own Break!</h2>
                        <div className='mt-3'>
                            {errors.map((error, index) => <p style={{color: '#F72323'}} key={index}>{error}</p>)}
                            <label className='form-label' htmlFor='name'>Break Name: </label>
                            <input className='form-control border border-dark' name='name' type='text' value={newBreak.name} onChange={changeHandler} />
                        </div>
                        <div className='mt-2'>
                            <label className='form-label' htmlFor='temperature'>Break Temperature: </label>
                            <input className='form-control border border-dark' name='temperature' type='number' value={newBreak.temperature} onChange={changeHandler} />
                        </div>
                        <div className='mt-2'>
                            <label className='form-label' htmlFor='waveHeight'>Break Wave Height: </label>
                            <input className='form-control border border-dark' name='waveHeight' type='number' value={newBreak.waveHeight} onChange={changeHandler} />
                        </div>
                        <div className='mt-2'>
                            <label className='form-label' htmlFor='windDirection'>Wind Direction: </label>
                            <input className='form-control border border-dark' name='windDirection' type='text' value={newBreak.windDirection} onChange={changeHandler} />
                        </div>
                        <div className='mt-2'>
                            <label className='form-label' htmlFor='notes'>Notes: </label>
                            <textarea className='form-control border border-dark' name='notes' value={newBreak.notes} onChange={changeHandler} />
                        </div>
                        <div className='mt-3 d-flex justify-content-end'>
                            <button className='btn' style={{backgroundColor: '#38369A', color: 'white'}} onClick={createHandler}>Create New Break</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default BreakForm;