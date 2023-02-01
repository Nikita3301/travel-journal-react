import React from "react";
import Card from "../components/Card.jsx";



export default function Home(){


    const [places, setPlaces] = React.useState([])


    React.useEffect(() => {
        async function getPlaces(){
            const res = await fetch("https://api.opentripmap.com/0.1/en/places/bbox?lon_min=23.635978&lat_min=49.770285&lon_max=24.285872&lat_max=49.985313&limit=56&format=geojson&apikey=5ae2e3f221c38a28845f05b6f5a6dc7747c993a6f20028b8b8e69b9a")
            const data = await res.json()
            setPlaces(data.features)
        }
        getPlaces()

        return () =>{

        }
        // fetch("https://api.opentripmap.com/0.1/en/places/bbox?lon_min=23.635978&lat_min=49.770285&lon_max=24.285872&lat_max=49.985313&format=geojson&apikey=5ae2e3f221c38a28845f05b6f5a6dc7747c993a6f20028b8b8e69b9a")
        //     .then(res => res.json())
        //     .then((data) => setPlaces(data.features));
    }, [])


    // const data1 = Data.map(item => {
    //     return (
    //         <Card
    //             {...item}
    //         />
    //     )
    // })
    // console.log(places.map(item => item.id))

    const cards = places.map(item =>{

        return(
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
                    {cards}
                </div>
                {/*<ul>*/}
                {/*    {data && data.length > 0 && data.map((item) => (*/}
                {/*        <li key={item.id}>{item.properties.name}</li>*/}
                {/*    ))}*/}
                {/*</ul>*/}
                {/*<pre>{JSON.stringify(starWarsData, null, 2)}</pre>*/}

            </div>
        </div>
    )
}
