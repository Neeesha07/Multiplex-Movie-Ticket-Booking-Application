import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function MoviesListForMultiplex() {
    const { multiplexId, selectedDate } = useParams(); // Extract multiplexId and selectedDate from URL parameters
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await fetch(`http://win10-2-186:8888/multiplex-ms/getMovies/${multiplexId}`);
                if (!response.ok) throw new Error("Failed to fetch movies");
                const moviesList = await response.json();

                console.log("Fetched Movies:", moviesList); // Log the fetched movies

                // Filter movies to only include screenings that match the selected date
                const filteredMovies = moviesList.map(movie => ({
                    ...movie,
                    screenings: movie.screenings.filter(screening => {
                        const screeningDate = new Date(screening.timeSlot).toISOString().split('T')[0];
                        console.log("Screening Date:", screeningDate, "Selected Date:", selectedDate); // Log screening and selected date
                        return screeningDate === selectedDate; // Check if the screening date matches the selected date
                    })
                })).filter(movie => movie.screenings.length > 0); // Remove movies with no screenings for the date

                console.log("Filtered Movies:", filteredMovies); // Log the filtered movies

                setMovies(filteredMovies); // Set filtered movies
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchMovies();
    }, [multiplexId, selectedDate]);

    const handleTimeslotClick = (movie, screeningId) => {
        // Navigate to the booking page with the selected timeslot
        navigate(`/seats/${movie.movieName}/${screeningId}`,{ state: { movie } });
    };
    if (loading) return <p>Loading movies...</p>;
    if (error) return <p>Error: {error}</p>;

    const hasNoMoviesOrScreenings = movies.length === 0 || movies.every(movie => movie.screenings.length === 0);

    if (hasNoMoviesOrScreenings) {
        return (
            <>
        <Navbar/>
            <div className="vh-100 d-flex align-items-center justify-content-center" style={{ backgroundImage: 'url(https://c4.wallpaperflare.com/wallpaper/607/847/687/deadpool-2-hd-4k-movies-wallpaper-preview.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="container bg-white rounded shadow p-4" style={{ opacity: 0.9 }}>
                    <h1 className="text-black text-center">
                        Oops... No movies are currently playing on this date
                    </h1>
                </div>
            </div>
            <Footer/>
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
                        Movies Available
                    </h1>
                </div>

                <div className="row">
                    {movies.map(movie => (
                        <div key={movie.movieId} className="col-md-6 mb-4">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">{movie.movieName}</h5>
                                    {/* <p className="card-text">{movie.movieDescription}</p> */}
                                    {/* <h6>Available Timeslots:</h6> */}
                                    <div className="d-flex flex-wrap">
                                        {movie.screenings.map(screening => (
                                            screening.availableSeats.length > 0 && (
                                                <button
                                                    key={screening.screeningId}
                                                    className="timeslot-box border rounded p-2 m-1 bg-primary text-white"
                                                    style={{ cursor: 'pointer' }}
                                                    onClick={() => handleTimeslotClick(movie,screening.screeningId)}
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
        <Footer/>
        </>
    );
}

export default MoviesListForMultiplex;