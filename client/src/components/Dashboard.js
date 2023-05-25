import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = (props) => {

    const navigate = useNavigate();

    const { breakList, setBreakList } = props;

    const logout = () => {
        axios.post('http://localhost:8080/api/logout', {}, { withCredentials: true })
            .then((res) => {
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

    return (
        <div>
            <div className="container">
                <div className="d-flex justify-content-between">
                    <h1>What'Surf</h1>
                </div>
                <h3 className="mb-5">Breaks</h3>
                <table className="table">
                    <thead style={{ backgroundColor: '#EEE1FF' }}>
                        <tr>
                            <th>Beach Breaks</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            breakList.map((beachBreak) => (
                                <tr>
                                    <td>{beachBreak.name}</td>

                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            <button onClick={logout}>Logout</button>
        </div>
    )
}

export default Dashboard;