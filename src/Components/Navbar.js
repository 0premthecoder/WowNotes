import React from 'react'
import { Link } from "react-router-dom";
import { useLocation, useHistory } from "react-router-dom";

export default function Navbar(props) {
    let location = useLocation();
    let history = useHistory()
    const { toogletheme, mode } = props

    const deletetoken = () => {
        // localStorage.getItem("token")
        localStorage.removeItem("token")
        history.push("/login")
    }
    return (
        <div>
            <nav className={`navbar  navbar-expand-lg navbar-${mode} bg-${mode}`}>
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Wow Notes</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link>
                            </li>
                            <li className="nav-item">
                                <Link style={localStorage.getItem("token") === null ? {} : { display: "none" }} className={`sign nav-link ${location.pathname === "/Login" ? "active" : ""}`} to="/Login">Login</Link>
                            </li>
                            <li className="nav-item" >
                                <Link style={localStorage.getItem("token") === null ? {} : { display: "none" }} className={`nav-link ${location.pathname === "/singup" ? "active" : ""}`} to="/singup">Sign Up</Link>
                            </li>

                        </ul>
                        <button className={`btn ${mode === 'light' ? "btn-outline-success" : "btn-outline-light"}`} onClick={deletetoken} type="submit"
                            style={localStorage.getItem("token") === null ? { display: "none" } : {}}>Logout</button>
                        <div className="form-check m-3 form-switch">
                            <input className="form-check-input" onClick={toogletheme} type="checkbox" id="flexSwitchCheckDefault" defaultChecked={mode === "dark"} />
                            <label className="form-check-label" style={{ color: `${mode === 'light' ? "black" : "white"}` }} htmlFor="flexSwitchCheckDefault">{mode === 'light' ? "Dark Mode" : "Light Mode"}</label>

                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}
