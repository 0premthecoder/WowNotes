import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';

export default function Login(props) {

    const [credentials, setCredentials] = useState({ email: "", password: "" })
    let history = useHistory()
    const { mode } = props

    const handleSubmit = async (e) => {
        e.preventDefault();
        const host = "http://localhost:5000/api"
        const response = await fetch(`${host}/auth/login`, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password }) // body data type must match "Content-Type" header
        });
        const json = await response.json()
        if (json.success) {
            // redirect save the token
            localStorage.setItem('token', json.authToken)
            history.push("/")
        }
        else {
            alert("Invalid Credentials")
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <>
            <div style={{ color: `${mode === 'light' ? "black" : "white"}` }}>
                <h1>Login</h1>
                <form className="my-3" onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" style={{ backgroundColor: `${mode === 'light' ? "white" : "#111"}` , color: `${mode === 'light' ? "black" : "white"}` }} name="email" value={credentials.email} onChange={onChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" style={{ backgroundColor: `${mode === 'light' ? "white" : "#111"}` , color: `${mode === 'light' ? "black" : "white"}` }} name="password" value={credentials.password} onChange={onChange} className="form-control" id="password" />
                        <div id="passwordhelp" className="form-text">Password Must be Greater Than 5 characters</div>
                    </div>
                    <button type="submit" className={`btn ${mode === 'light' ? "btn-outline-success" : "btn-outline-light"}`} >Login</button>
                </form>
            </div>
        </>
    )
}
