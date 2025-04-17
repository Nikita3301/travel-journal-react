import React from "react";

export default function CardView({data, handler, isShow}) {
    if (!isShow || !data) {
        return null;
    }

    function streetCheck() {
        if (data.address?.road) {
            return data.address.road;
        } else if (data.address?.pedestrian) {
            return data.address.pedestrian;
        } else {
            return null;
        }
    }

    const name = data.name || "No Name Available";
    const hasLocation = data.address?.city || streetCheck();
    
    return (
        <div className="popup-wrapper" onClick={handler}>
            <div className="popup-container" onClick={(e) => e.stopPropagation()}>
                <button className="popup-button" onClick={handler}>&times;</button>

                <div className="popup-content">
                    <div className="popup-text-container">
                        <div className="popup-text">
                            <h2>{name}</h2>
                            {hasLocation && (
                                <div className="popup-text-info">
                                    <img src="https://cdn-icons-png.flaticon.com/24/3069/3069613.png" alt="Location icon" />
                                    <div>
                                        {data.address?.city && <h3>City: {data.address.city}</h3>}
                                        {streetCheck() && <h3>Location: {streetCheck()}</h3>}
                                    </div>
                                </div>
                            )}
                            {data.wikipedia_extracts?.text && (
                                <p className="popup-text-description">{data.wikipedia_extracts.text}</p>
                            )}
                        </div>
                    </div>
                    <div className="popup-more">
                        <h3>See more info in:</h3>
                        <div className="popup-more-icons">
                            {data.wikipedia && (
                                <a href={data.wikipedia} target="_blank" rel="noopener noreferrer">
                                    <img src="https://img.icons8.com/ios-filled/32/wikipedia.png" alt="Wikipedia" />
                                </a>
                            )}
                            {data.otm && (
                                <a href={data.otm} target="_blank" rel="noopener noreferrer">
                                    <img src="https://cdn-icons-png.flaticon.com/32/1865/1865083.png" alt="OpenTripMap" />
                                </a>
                            )}
                        </div>
                    </div>
                </div>
                
                <div className="popup-image">
                    {data.preview?.source ? (
                        <img src={data.preview.source} alt={name} />
                    ) : (
                        <img src={`https://via.placeholder.com/400x600?text=${encodeURIComponent(name)}`} alt="No image available" />
                    )}
                </div>
            </div>
        </div>
    );
}