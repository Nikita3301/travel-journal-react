import React, { useState, useEffect } from "react";
import CardView from "./CardView.jsx";

export default function Card(props) {
    const [data, setData] = useState(null);
    const [isShow, setIsShow] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [mapImageError, setMapImageError] = useState(false);
    const [loading, setLoading] = useState(false);

  const { properties, geometry } = props;
  const [longitude, latitude] = geometry.coordinates;

  const handlerIsShow = () => {
    setIsShow(!isShow);
  };

  const fetchDetailData = async () => {
    if (data) {
      // If we already have data, just show the modal
      setIsShow(true);
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(
        `https://api.opentripmap.com/0.1/en/places/xid/${properties.xid}?apikey=5ae2e3f221c38a28845f05b6f5a6dc7747c993a6f20028b8b8e69b9a`
      );
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      const result = await response.json();
      setData(result);
      setIsShow(true);
    } catch (error) {
      console.error("Error fetching place details:", error);
      // Even if fetch fails, open modal with basic info
      setData({ 
        name: properties.name, 
        address: {}, 
        otm: `https://opentripmap.com/en/card/${properties.xid}` 
      });
      setIsShow(true);
    } finally {
      setLoading(false);
    }
  };

  function separateString() {
    if (!properties.kinds) return [];
    const categories = properties.kinds.split(",");
    return categories.map((item, index) => (
      <h3 className="category" key={index}>
        {item.replace(/_/g, " ")}
      </h3>
    ));
  }

  // Primary map image from OpenStreetMap (no API key required)
  const osmMapUrl = `https://staticmap.openstreetmap.de/staticmap.php?center=${latitude},${longitude}&zoom=14&size=400x200&markers=${latitude},${longitude},red-pushpin`;

  // Secondary map image from MapQuest (backup option)
  const mapQuestUrl = `https://www.mapquestapi.com/staticmap/v5/map?key=GHPz1xmQLXVXDSzxRpKXnfOW0JGl8cYc&center=${latitude},${longitude}&size=400,200&zoom=14&locations=${latitude},${longitude}&defaultMarker=marker-red-sm`;

  // Fallback to a placeholder
  const placeholderUrl = `https://placehold.co/400x200/212529/e9ecef?text=${encodeURIComponent(
    properties.name || "Location"
  )}`;

  const getImageUrl = () => {
    if (mapImageError) {
      return placeholderUrl;
    }
    return osmMapUrl;
  };

  return (
    <>
      {isShow && <CardView isShow={isShow} handler={handlerIsShow} data={data || {}} />}

      <div className="card">
        <div className="card--image">
          <img
            src={getImageUrl()}
            alt={`Map location for ${properties.name}`}
            className={imageLoaded ? "loaded" : ""}
            onLoad={() => setImageLoaded(true)}
            onError={(e) => {
              // If OSM fails, try MapQuest
              if (e.target.src === osmMapUrl) {
                e.target.src = mapQuestUrl;
              }
              // If MapQuest fails too, use placeholder
              else if (e.target.src === mapQuestUrl) {
                e.target.src = placeholderUrl;
              }
              // Mark that we had an error with map images
              setMapImageError(true);
              setImageLoaded(true);
            }}
          />
          {properties.rate && (
            <div className="card--rating">
              <span>{properties.rate}/10</span>
            </div>
          )}
        </div>

        <div className="card--body">
          <h3 className="card--title">{properties.name || "Unnamed Location"}</h3>

          <div className="card--location">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
            </svg>
            <span>
              {latitude.toFixed(4)}, {longitude.toFixed(4)}
            </span>
          </div>

          <div className="card-button-container">
            <button
              className="card--button"
              onClick={fetchDetailData}
              disabled={loading}
            >
              {loading ? "Loading..." : "Read more"}
            </button>

            {properties?.osm && (
              <a
                href={`https://www.openstreetmap.org/${properties.osm}`}
                target="_blank"
                rel="noopener noreferrer"
                className="card--external-link"
                aria-label="View on OpenStreetMap"
              >
                <svg
                  fill="#000000"
                  width="24px"
                  height="24px"
                  viewBox="0 0 612 612"
                >
                  <path d="M516.316,337.52l94.233,193.581c3.832,7.873-0.196,14.314-8.952,14.314H10.402c-8.756,0-12.785-6.441-8.952-14.314
                  L95.684,337.52c1.499-3.079,5.528-5.599,8.952-5.599h80.801c2.49,0,5.853,1.559,7.483,3.442
                  c5.482,6.335,11.066,12.524,16.634,18.65c5.288,5.815,10.604,11.706,15.878,17.735h-95.891c-3.425,0-7.454,2.519-8.952,5.599
                  L58.163,505.589h495.67l-62.421-128.242c-1.498-3.08-5.527-5.599-8.953-5.599h-96.108c5.273-6.029,10.591-11.92,15.879-17.735
                  c5.585-6.144,11.2-12.321,16.695-18.658c1.628-1.878,4.984-3.434,7.47-3.434h80.971
                  C510.789,331.921,514.817,334.439,516.316,337.52z M444.541,205.228c0,105.776-88.058,125.614-129.472,227.265
                  c-3.365,8.26-14.994,8.218-18.36-0.04c-37.359-91.651-112.638-116.784-127.041-198.432
                  c-14.181-80.379,41.471-159.115,122.729-166.796C375.037,59.413,444.541,124.204,444.541,205.228z M379.114,205.228
                  c0-40.436-32.779-73.216-73.216-73.216s-73.216,32.78-73.216,73.216c0,40.437,32.779,73.216,73.216,73.216
                  S379.114,245.665,379.114,205.228z" />
                </svg>
              </a>
            )}
          </div>

          <div className="categories-container">{separateString()}</div>
        </div>
      </div>
    </>
  );
}

