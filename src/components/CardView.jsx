import React from "react";

export default function CardView({data, handler, isShow}) {

    if (!isShow) {
        return null
    }

    function streetCheck(){
        if (data.address?.road !== undefined){
            return data.address?.road

        }
        else if(data.address?.pedestrian !== undefined){
            return data.address?.pedestrian

        }else{
            return null

        }
    }

    const {name, preview} = data

    return (
        <div className="popup-wrapper" onClick={handler}>
            <div className="popup-container" onClick={(e) => e.stopPropagation()}>
                <button className="popup-button" onClick={handler}>&times;</button>

                <div className="popup-content">
                    <div className="popup-text-container">
                        <div className="popup-text">
                            <h2>{name}</h2>
                            <div className="popup-text-info">
                                <img src="https://cdn-icons-png.flaticon.com/24/3069/3069613.png" alt=""/>
                                <div>
                                    <h3>City: {data.address?.city}</h3>
                                    {streetCheck() === null ? "" : <h3>Location: {streetCheck()}</h3>}
                                </div>
                            </div>
                            <p className="popup-text-description">{data.wikipedia_extracts?.text}</p>
                        </div>

                    </div>
                    <div className="popup-more">
                        <h3>See more info in:</h3>
                        <div className="popup-more-icons">
                            {data.wikipedia === undefined ? "" : <a href={data.wikipedia}><img src="https://img.icons8.com/ios-filled/32/wikipedia.png" alt=""/></a>}
                            {data.otm === undefined ? "" : <a href={data.otm}><img src="https://cdn-icons-png.flaticon.com/32/1865/1865083.png" alt=""/></a>}
                        </div>
                    </div>
                </div>
                <div className="popup-image">
                    <img src={preview?.source} alt=""/>
                </div>
            </div>
        </div>
    )

}
