import React, { useState, useEffect } from "react";
import Card from "../components/Card.jsx";

export default function Home() {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useState({
    lon_min: 23.635978,
    lat_min: 49.770285,
    lon_max: 24.285872,
    lat_max: 49.985313,
    limit: 10,
  });

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [placesPerPage, setPlacesPerPage] = useState(6);
  const [totalResults, setTotalResults] = useState(0);

  const fetchPlaces = async (params) => {
    try {
      setLoading(true);
      const { lon_min, lat_min, lon_max, lat_max, limit } = params;
      const apiKey = "5ae2e3f221c38a28845f05b6f5a6dc7747c993a6f20028b8b8e69b9a";

      const response = await fetch(
        `https://api.opentripmap.com/0.1/en/places/bbox?lon_min=${lon_min}&lat_min=${lat_min}&lon_max=${lon_max}&lat_max=${lat_max}&limit=${limit}&format=geojson&apikey=${apiKey}`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.status}`);
      }

      const data = await response.json();
      setPlaces(data.features);
      setTotalResults(data.features.length);
      setCurrentPage(1); // Reset to first page on new search
    } catch (err) {
      console.error("Error fetching places:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlaces(searchParams);
  }, []);

  const handleParamChange = (e) => {
    const { name, value } = e.target;
    setSearchParams((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchPlaces(searchParams);
  };

  // Get current page places
  const indexOfLastPlace = currentPage * placesPerPage;
  const indexOfFirstPlace = indexOfLastPlace - placesPerPage;
  const currentPlaces = places.slice(indexOfFirstPlace, indexOfLastPlace);

  // Calculate total pages
  const totalPages = Math.ceil(places.length / placesPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Go to next page
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Go to previous page
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Handle places per page change
  const handlePlacesPerPageChange = (e) => {
    setPlacesPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  if (loading) {
    return (
      <div className="home-page loading">
        <div className="loading-spinner">Loading destinations...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="home-page error">
        <div className="error-message">
          <h3>Something went wrong</h3>
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>Try Again</button>
        </div>
      </div>
    );
  }

  return (
    <div className="home-page">
      <div className="search-controls">
        <form onSubmit={handleSubmit}>
          <div className="search-inputs">
            <div className="input-group">
              <label>Min Longitude:</label>
              <input
                type="number"
                step="0.000001"
                name="lon_min"
                value={searchParams.lon_min}
                onChange={handleParamChange}
              />
            </div>
            <div className="input-group">
              <label>Min Latitude:</label>
              <input
                type="number"
                step="0.000001"
                name="lat_min"
                value={searchParams.lat_min}
                onChange={handleParamChange}
              />
            </div>
            <div className="input-group">
              <label>Max Longitude:</label>
              <input
                type="number"
                step="0.000001"
                name="lon_max"
                value={searchParams.lon_max}
                onChange={handleParamChange}
              />
            </div>
            <div className="input-group">
              <label>Max Latitude:</label>
              <input
                type="number"
                step="0.000001"
                name="lat_max"
                value={searchParams.lat_max}
                onChange={handleParamChange}
              />
            </div>
            <div className="input-group">
              <label>Limit:</label>
              <input
                type="number"
                min="1"
                max="500"
                name="limit"
                value={searchParams.limit}
                onChange={handleParamChange}
              />
            </div>
          </div>
          <button type="submit" className="search-button">
            Search
          </button>
        </form>
      </div>

      <div className="destinations-container">
        <div className="destinations-header">
          <h2>
            Popular Destinations{" "}
            <span className="results-count">({totalResults} results)</span>
          </h2>
          <div className="pagination-controls">
            <label htmlFor="placesPerPage">Items per page:</label>
            <select
              id="placesPerPage"
              value={placesPerPage}
              onChange={handlePlacesPerPageChange}
              className="places-per-page-select"
            >
              <option value="3">3</option>
              <option value="6">6</option>
              <option value="9">9</option>
              <option value="12">12</option>
            </select>
          </div>
        </div>

        {places.length === 0 ? (
          <p className="no-results">
            No destinations found. Try different search criteria.
          </p>
        ) : (
          <>
            <div className="destinations-data-container">
              {currentPlaces.map((item) => (
                <Card key={item.id || item.properties.xid} {...item} />
              ))}
            </div>

            <div className="pagination">
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className="pagination-button"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
                  />
                </svg>
                Previous
              </button>

              <div className="pagination-numbers">
                {/* First page */}
                {currentPage > 2 && (
                  <button
                    onClick={() => paginate(1)}
                    className={`pagination-number ${
                      currentPage === 1 ? "active" : ""
                    }`}
                  >
                    1
                  </button>
                )}

                {/* Ellipsis for skipped pages */}
                {currentPage > 3 && (
                  <span className="pagination-ellipsis">•••</span>
                )}

                {/* Previous page if not first */}
                {currentPage > 1 && (
                  <button
                    onClick={() => paginate(currentPage - 1)}
                    className="pagination-number"
                  >
                    {currentPage - 1}
                  </button>
                )}

                {/* Current page */}
                <button
                  className="pagination-number active"
                  aria-current="page"
                >
                  {currentPage}
                </button>

                {/* Next page if not last */}
                {currentPage < totalPages && (
                  <button
                    onClick={() => paginate(currentPage + 1)}
                    className="pagination-number"
                  >
                    {currentPage + 1}
                  </button>
                )}

                {/* Ellipsis for skipped pages */}
                {currentPage < totalPages - 2 && (
                  <span className="pagination-ellipsis">•••</span>
                )}

                {/* Last page */}
                {currentPage < totalPages - 1 && (
                  <button
                    onClick={() => paginate(totalPages)}
                    className={`pagination-number ${
                      currentPage === totalPages ? "active" : ""
                    }`}
                  >
                    {totalPages}
                  </button>
                )}
              </div>

              <button
                onClick={nextPage}
                disabled={currentPage === totalPages || totalPages === 0}
                className="pagination-button"
              >
                Next
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                  />
                </svg>
              </button>
            </div>

            {/* Add pagination info below if desired */}
            <div className="pagination-info">
              Page {currentPage} of {totalPages} | Showing{" "}
              {indexOfFirstPlace + 1}-
              {Math.min(indexOfLastPlace, places.length)} of {places.length}{" "}
              places
            </div>
          </>
        )}
      </div>
    </div>
  );
}
