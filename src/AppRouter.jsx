import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/Home.jsx";
import React from "react";
import About from "./pages/About.jsx";


export default function AppRouter() {
    return (
        <Routes>
            <Route path="/" exact element={<Home/>} />
            <Route exact path="/About" element={<About/>} />
        </Routes>
    )
}