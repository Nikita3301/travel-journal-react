import React from "react";

export default function CardView({data, handler, isShow}) {

    if (!isShow) {
        return null
    }

    const {name, preview } = data


    return (
        <div className="popup-wrapper" onClick={handler}>
            <div className="popup-container" onClick={(e) => e.stopPropagation()}>

                <div className="popup-title">
                    <button className="popup-button" onClick={handler}>&times;</button>
                </div>
                <div className="popup-image">
                    <img src={preview?.source} alt=""/>
                    <h2>{name}</h2>

                </div>
                <div className="popup-content">

                    <div className="popup-text">
                        <p>{data.wikipedia_extracts?.text}</p>
                    </div>
                </div>
            </div>
        </div>
    )

}
