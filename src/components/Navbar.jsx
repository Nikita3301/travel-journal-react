import React from "react";
import {BrowserRouter, Routes, Route, Link, NavLink} from "react-router-dom";
import Home from "../pages/Home.jsx";


export default function Navbar() {
    return (
        <header>
            <h2 className="logo-text">FOXTRAVEL</h2>
            <nav>
                {/*<img src="" className="nav--logo" alt="nav-logo"/>*/}
                <ul>
                    <li><NavLink className={({ isActive }) => (isActive ? 'active' : 'inactive')} to="/">Home</NavLink></li>
                    <li><NavLink to="/About">About</NavLink></li>
                </ul>
            </nav>
        </header>

    )
}