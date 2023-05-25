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
            <form onSubmit={(e) => createHandler(e)}>
                <div>
                    <h1>Create your own Break!</h1>
                    <Link to={"/dashboard"}>Dashboard</Link>
                    {errors.map((error, index) => <p key={index}>{error}</p>)}
                    <label htmlFor='name'>Break Name: </label>
                    <input name='name' type='text' value={newBreak.name} onChange={changeHandler} />
                </div>
                <div>
                    <label htmlFor='temperature'>Break Temperature: </label>
                    <input name='temperature' type='number' value={newBreak.temperature} onChange={changeHandler} />
                </div>
                <div>
                    <label htmlFor='waveHeight'>Break Wave Height: </label>
                    <input name='waveHeight' type='number' value={newBreak.waveHeight} onChange={changeHandler} />
                </div>
                <div>
                    <label htmlFor='windDirection'>Wind Direction: </label>
                    <input name='windDirection' type='text' value={newBreak.windDirection} onChange={changeHandler} />
                </div>
                <div>
                    <label htmlFor='notes'>Notes: </label>
                    <textarea name='notes' value={newBreak.notes} onChange={changeHandler} />
                </div>
                <div>
                    <button onClick={createHandler}>Create New Break</button>
                </div>
            </form>
        </div>
    )
}

export default BreakForm;