import React from "react";
import './App.css'
import Navbar from "./components/Navbar.jsx";
import AppRouter from "./AppRouter.jsx";
import {BrowserRouter} from "react-router-dom";

function App() {
    return (
        <div>
            <BrowserRouter>
                <Navbar></Navbar>
                <AppRouter></AppRouter>
            </BrowserRouter>
        </div>
    )
}

export default App
