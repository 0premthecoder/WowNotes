import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';

export default function Signup(props) {

    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" })
    let history = useHistory()
    const { mode } = props

    const handleSubmit = async (e) => {
        e.preventDefault();
        const host = "http://localhost:5000/api"
        const { name, email, password, cpassword } = credentials
        if (cpassword !== password) {
            alert("Confirm Password Not Match")
        }
        else {
            const response = await fetch(`${host}/auth/createnuser`, {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password }) // body data type must match 
            });
            const json = await response.json()
            if (json.success) {
                // redirect and save the token
                localStorage.setItem('token', json.authToken)
                history.push("/")
            }
            else {
                alert("Invalid Credentials")
            }
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <>
            <div style={{ color: `${mode === 'light' ? "black" : "white"}` }}>
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3  my-4">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" name="name" style={{ backgroundColor: `${mode === 'light' ? "white" : "#111"}` , color: `${mode === 'light' ? "black" : "white"}` }} className="form-control" onChange={onChange} id="name" />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" name="email" style={{ backgroundColor: `${mode === 'light' ? "white" : "#111"}` , color: `${mode === 'light' ? "black" : "white"}` }} className="form-control" onChange={onChange} id="email" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" name="password" style={{ backgroundColor: `${mode === 'light' ? "white" : "#111"}` , color: `${mode === 'light' ? "black" : "white"}` }} className="form-control" onChange={onChange} id="password" />
                    <div id="passwordhelp" className="form-text">Password Must be Greater Than 5 characters</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" name="cpassword" style={{ backgroundColor: `${mode === 'light' ? "white" : "#111"}` , color: `${mode === 'light' ? "black" : "white"}` }} className="form-control" onChange={onChange} id="cpassword" />
                </div>
                <button type="submit" className={`btn ${mode === 'light' ? "btn-outline-success" : "btn-outline-light"}`}>Sign Up</button>
            </form>
            </div>
        </>
    )
}
