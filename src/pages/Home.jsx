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


    const [user, setUser] = useState([]);

    const fetchData = () => {
        return fetch("https://api.opentripmap.com/0.1/en/places/bbox?lon_min=23.635978&lat_min=49.770285&lon_max=24.285872&lat_max=49.985313&format=geojson&apikey=5ae2e3f221c38a28845f05b6f5a6dc7747c993a6f20028b8b8e69b9a")
            .then((response) => response.json())
            .then((data) => setUser(data));
    }

    useEffect(() => {
        fetchData();
    },[])

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
                    {user && user.length > 0 && user.map(userObj => (
                        <p>{userObj.type}</p>
                    ))}
            </div>
        </div>
    )
}
