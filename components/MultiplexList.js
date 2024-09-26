import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

function MultiplexList(props) {
    const [multiplexes, setMultiplexes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedDates, setSelectedDates] = useState({}); // Object to hold selected dates for each multiplex
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMultiplexes = async () => {
            try {
                const response = await fetch('http://localhost:8081/multiplex/getAllMultiplexes');
                if (!response.ok) throw new Error("Failed to fetch multiplexes");
                const multiplexList = await response.json();
                setMultiplexes(multiplexList); // Assuming the response is an array
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchMultiplexes();
    }, []);

    const handleViewClick = (multiplexId) => {
        const selectedDate = selectedDates[multiplexId]; // Get the selected date for this multiplex
        if (selectedDate) {
            
            navigate(`/moviesListForMultiplex/${multiplexId}/${selectedDate}`);
        }
    };

    const handleDateChange = (multiplexId, date) => {
        setSelectedDates(prev => ({ ...prev, [multiplexId]: date })); // Update the selected date for this multiplex
    };

    if (loading) return <p>Loading multiplexes...</p>;
    if (error) return <p>Error: {error}</p>;

    if (multiplexes.length === 0) {
        return (
            <>
        <Navbar/>
            <div className="vh-100 d-flex align-items-center justify-content-center" style={{ backgroundImage: 'url(https://c4.wallpaperflare.com/wallpaper/607/847/687/deadpool-2-hd-4k-movies-wallpaper-preview.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <Navbar/>
                <div className="container bg-white rounded shadow p-4" style={{ opacity: 0.9 }}>
                    <h1 className="text-black text-center">
                        Oops... No multiplexes are currently screening 
                    </h1>
                </div>
            </div>
            </>
        );
    }

    return (
        <>
        <Navbar/>
        <div className="vh-100 d-flex align-items-center justify-content-center" style={{ backgroundImage: 'url(https://c4.wallpaperflare.com/wallpaper/607/847/687/deadpool-2-hd-4k-movies-wallpaper-preview.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className="container bg-white rounded shadow p-4" style={{ opacity: 0.9 }}>
                <div className="text-center mb-4">
                    <h1 className="text-black" style={{ fontSize: '2.5rem' }}>
                        Multiplexes - Choose your watching experience
                    </h1>
                </div>

                <div className="row">
                    {multiplexes.map(multiplex => {
                        const dates = Object.keys(multiplex.availableScreensPerTimeslot);
                        const firstDate = new Date(Math.min(...dates.map(date => new Date(date))));
                        const lastDate = new Date(Math.max(...dates.map(date => new Date(date))));

                        const dateList = [];
                        for (let d = firstDate; d <= lastDate; d.setDate(d.getDate() + 1)) {
                            dateList.push(new Date(d).toISOString().split('T')[0]); // Store in YYYY-MM-DD format
                        }

                        return (
                            <div key={multiplex.multiplexId} className="col-md-4 mb-4">
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">{multiplex.multiplexName}</h5>
                                        <p className="card-text">{multiplex.multiplexLocation}</p>

                                        <h6>Select Date:</h6>
                                        <select
                                            value={selectedDates[multiplex.multiplexId] || ""}
                                            onChange={(e) => handleDateChange(multiplex.multiplexId, e.target.value)}
                                            className="form-select mb-3"
                                        >
                                            <option value="" disabled>Select a date</option>
                                            {dateList.map(date => (
                                                <option key={date} value={date}>{new Date(date).toLocaleDateString()}</option>
                                            ))}
                                        </select>
                                        <button
                                            onClick={() => handleViewClick(multiplex.multiplexId)}
                                            className="btn btn-primary"
                                            disabled={!selectedDates[multiplex.multiplexId]} // Disable if no date is selected
                                        >
                                            View
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
        </>
    );
}


export default MultiplexList;