import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function MultiplexList(props) {
    const [multiplexes, setMultiplexes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
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

    const handleMultiplexClick = (multiplexId) => {
        // Navigate to a specific multiplex or perform an action
        navigate(`/moviesListForMultiplex/${multiplexId}`);
    };

    if (loading) return <p>Loading multiplexes...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="vh-100 d-flex align-items-center justify-content-center" style={{ backgroundImage: 'url(https://c4.wallpaperflare.com/wallpaper/607/847/687/deadpool-2-hd-4k-movies-wallpaper-preview.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className="container bg-white rounded shadow p-4" style={{ opacity: 0.9 }}>
                <div className="text-center mb-4">
                    <h1 className="text-black" style={{ fontSize: '2.5rem' }}>
                        Multiplexes - Choose your watching experience
                    </h1>
                </div>

                <div className="row">
                    {multiplexes.map(multiplex => (
                        <div key={multiplex.multiplexId} className="col-md-4 mb-4">
                            <div className="card">
                                <div className="card-body" onClick={() => handleMultiplexClick(multiplex.multiplexId)} style={{ cursor: 'pointer' }}>
                                    <h5 className="card-title">{multiplex.multiplexName}</h5>
                                    <p className="card-text">{multiplex.multiplexLocation}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default MultiplexList;