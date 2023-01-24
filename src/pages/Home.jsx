import React, {useEffect, useState} from "react";
import Data from "../Data.js";
import Card from "../components/Card.jsx";



export default function Home(){

    const data = Data.map(item => {
        return (
                <Card
                    {...item}
                />
            
        )
    })


    return (
        <div className="home-page">
            <div className="background-image-container">
                <img src="https://source.unsplash.com/random/1920x1080/?travel" alt=""/>
            </div>
            <div className="destinations-container">
                <h2>Our best destinations</h2>
                <div className="destinations-data-container">
                    {data}
                </div>
            </div>
        </div>
    )
}
