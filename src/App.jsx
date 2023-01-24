import React from "react";
import './App.css'
import Card from "./components/Card.jsx";
import Data from "/src/Data"
import Navbar from "./components/Navbar.jsx";
import AppRouter from "./AppRouter.jsx";
import {Router} from "react-router";
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
