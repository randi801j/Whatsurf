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
            <nav className="navbar navbar-expand-lg navbar-light" style={{backgroundColor: "#020887"}}>
                <div className="container-fluid">
                    <h1 className="text-white">What'Surf</h1>
                    <div className="collapse navbar-collapse d-flex justify-content-end" id="navbarNavAltMarkup">
                        {/* Insert nav-links here */}
                        <ul className="nav nav-tabs">
                            <li className="nav-item">
                                <Link to={'#'} className="nav-link active" aria-current="page" style={{color: "#020887", backgroundColor: "#C6EBBE"}}>Dashboard</Link>
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
                <h2 className="mt-2">All Breaks</h2>
                {
                    breakList.map((beachBreak, index) => (
                        <div className='d-flex justify-content-center'>
                            <div key={index} className="card mt-3" style={{maxWidth: '540px'}}>
                                <h5 className="card-header border border-dark" style={{backgroundColor: "#7CA5B8"}}><Link to={`/break/${beachBreak._id}`} style={{color: "white"}} id="detailLink">{beachBreak.name}</Link></h5>
                                <div className="row g-0 border border-dark">
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
                                            <button className="btn" style={{backgroundColor: '#A9DBB8', color: '#020887'}} onClick={() => deleteHandler(beachBreak._id)}>Delete Break 🌊</button>
                                            <Link to={`/edit/${beachBreak._id}`} className="btn m-1" style={{backgroundColor: '#38369A', color: 'white'}}>Edit</Link>
                                        </div>
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