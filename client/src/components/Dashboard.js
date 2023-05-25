import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {useNavigate, useParams} from 'react-router-dom';
import wave from '../img/breaking_wave.jpg';

const Dashboard = (props) => {

    const { id } = useParams()
    // console.log(id);

    const navigate = useNavigate()

    const {breakList, setBreakList} = props;

    const logout =()=> {
        axios.post('http://localhost:8080/api/logout',{},{withCredentials:true})
            .then((res)=>{
                navigate('/')
            })
            .catch((err) => {
                console.log(err);
            })
    }

    useEffect(() => {
        axios.get('http://localhost:8080/api/allBreaks')
            .then((res) => {
                console.log(res);
                setBreakList(res.data)
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    const deleteHandler = (id) => {
        console.log(id);
        axios.delete(`http://localhost:8080/api/deleteBreak/${id}`)
            .then((res) => {
                console.log(res);
                console.log(res.data);
                const updatedBreakList = breakList.filter((beachBreak) => beachBreak._id !== id)
                setBreakList(updatedBreakList)
            })
            .catch((err) => {
                console.log(err);
            })
    }

    return(
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <h1>What'Surf</h1>
                    <div className="collapse navbar-collapse d-flex justify-content-end" id="navbarNavAltMarkup">
                        {/* Insert nav-links here */}
                        <ul className="nav nav-tabs">
                            <li className="nav-item">
                                <Link to={'#'} className="nav-link active" aria-current="page">All Breaks</Link>
                            </li>
                            <li className="nav-item">
                                <Link to={'#'} className="nav-link">My Breaks</Link>
                            </li>
                            <li className="nav-item">
                                <Link to={'/createBreak'} className="nav-link">Add Breaks</Link>
                            </li>
                            <li className="nav-item">
                                <button className="nav-link btn btn-link" onClick={logout}>Logout</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div className="container">
                <h3 className="mt-3">Breaks</h3>
                {
                    breakList.map((beachBreak, index) => (
                        <div key={index} className="card mb-3" style={{maxWidth: '540px'}}>
                            <h5 className="card-header bg-light border border-dark"><Link to={`/break/${beachBreak._id}`}>{beachBreak.name}</Link></h5>
                            <div className="row g-0">
                                <div className="col-md-4">
                                    <img src={wave} className="img-fluid rounded-start" alt="..."/>
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body">
                                        <h6 className="card-text">Description:</h6>
                                        <p className="card-text">Temperature: {beachBreak.temperature} degrees</p>
                                        <p className="card-text">Wave height: {beachBreak.waveHeight} feet</p>
                                        <p className="card-text">Wind direction: {beachBreak.windDirection}</p>
                                        <p className="card-text"><small className="text-muted">Notes: {beachBreak.notes}</small></p>
                                        <button className="btn btn-danger" onClick={() => deleteHandler(beachBreak._id)}>Delete Break 🌊</button>
                                        <Link to={`/edit/${beachBreak._id}`} className="btn btn-secondary m-1">Edit</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
            {/* <button onClick={logout}>Logout</button> */}
        </div>
    )
}

export default Dashboard;