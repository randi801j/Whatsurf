import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';

const DisplayBreak = (props => {
    const { id } = useParams();

    const navigate = useNavigate();

    const [displayBreak, setDisplayBreak] = useState({
        name: "",
        temperature: "",
        waveHeight: "",
        windDirection: "",
        notes: ""
    })

    useEffect(() => {
        axios.get("http://localhost:8080/api/oneBreak/" + id,
            { withCredentials: true })
            .then(response => {
                console.log("Accessed this break", response.data)
                setDisplayBreak(response.data)
            })
            .catch(err => console.log("Access Error:", err))
    }, [])

    const logout =()=> {
        axios.post('http://localhost:8080/api/logout',{},{withCredentials:true})
            .then((res)=>{
                navigate('/')
            })
            .catch((err) => {
                console.log(err);
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
                <div className='d-flex justify-content-center mt-4'>
                    <div className='border border-dark w-50 p-3' style={{backgroundColor: '#C6EBBE'}}>
                        <div className='d-flex justify-content-center'>
                            <h3>{displayBreak.name}</h3>
                        </div>
                        <div>
                            <div className='d-flex justify-content-between mt-3'>
                                <p>Current Temperature:</p>
                                <p>{displayBreak.temperature} degrees</p>
                            </div>
                            <div className='d-flex justify-content-between mt-2'>
                                <p>Wave Height:</p>
                                <p>{displayBreak.waveHeight} feet</p>
                            </div>
                            <div className='d-flex justify-content-between mt-2'>
                                <p>Wind Direction:</p>
                                <p>{displayBreak.windDirection}</p>
                            </div>
                            <div className='d-flex justify-content-between mt-2'>
                                <p>Notes:</p>
                                <p>{displayBreak.notes}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
})

export default DisplayBreak