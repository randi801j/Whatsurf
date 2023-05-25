import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';

const DisplayBreak = (props => {
    const { id } = useParams();

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

    return (
        <div>
            <div>
                <h3>{displayBreak.name}</h3>
            </div>
            <div>
                <p>Current Temperature: {displayBreak.temperature}</p>
                <p>Wave Height: {displayBreak.waveHeight}</p>
                <p>Wind Direction {displayBreak.windDirection}</p>
            </div>
        </div>
    )
})

export default DisplayBreak