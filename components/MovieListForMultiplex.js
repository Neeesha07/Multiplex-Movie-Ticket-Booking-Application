import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function MoviesListForMultiplex() {
    const { multiplexId } = useParams();
    // const multiplexId = 1;
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await fetch(`http://localhost:8081/multiplex/getMovies/${multiplexId}`);
                if (!response.ok) throw new Error("Failed to fetch movies");
                const moviesList = await response.json();
                setMovies(moviesList); // Assuming the response is an array
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchMovies();
    }, [multiplexId]);

    const handleTimeslotClick = (timeslot, screeningId) => {
        // Navigate to the booking page with the selected timeslot
        navigate(`/book/${timeslot}/${screeningId}`);
    };

    if (loading) return <p>Loading movies...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="vh-100 d-flex align-items-center justify-content-center" style={{ backgroundImage: 'url(https://c4.wallpaperflare.com/wallpaper/607/847/687/deadpool-2-hd-4k-movies-wallpaper-preview.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className="container bg-white rounded shadow p-4" style={{ opacity: 0.9 }}>
                <div className="text-center mb-4">
                    <h1 className="text-black" style={{ fontSize: '2.5rem' }}>
                        Movies Available
                    </h1>
                </div>

                <div className="row">
                    {movies.map(movie => (
                        <div key={movie.movieId} className="col-md-6 mb-4">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">{movie.movieName}</h5>
                                    <p className="card-text">{movie.movieDescription}</p>
                                    <h6>Available Timeslots:</h6>
                                    <div className="d-flex flex-wrap">
                                        {movie.screenings.map(screening => (
                                            screening.availableSeats.length > 0 && (
                                                <button
                                                    key={screening.screeningId}
                                                    className="timeslot-box border rounded p-2 m-1 bg-primary text-white"
                                                    style={{ cursor: 'pointer' }}
                                                    onClick={() => handleTimeslotClick(screening.timeSlot, screening.screeningId)}
                                                >
                                                    {new Date(screening.timeSlot).toLocaleTimeString([], {
                                                        hour: '2-digit',
                                                        minute: '2-digit',
                                                    })}
                                                </button>
                                            )
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default MoviesListForMultiplex;
