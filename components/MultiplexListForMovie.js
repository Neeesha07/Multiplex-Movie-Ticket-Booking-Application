import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function MultiplexListForMovie() {
    const movieName = "Deadpool and wovlerine and someone";
    const date = "2024-09-26"
    // const { movieName, date } = useParams();
    const [multiplexes, setMultiplexes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMultiplexes = async () => {
            try {
                // const response = await fetch('http://localhost:8081/multiplex/getMultiplex/1'); // Ensure you use http://
                const response = await fetch(`http://localhost:8081/multiplex/allMultiplexesByMovieName/${encodeURIComponent(movieName)}`); // Ensure you use http://
                // if (!response.ok) throw new Error("Failed to fetch multiplexes");
                const multiplexList = await response.json();
                setMultiplexes(multiplexList); // Assuming the response is an array
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchMultiplexes();
    }, [movieName]);

    const handleTimeslotClick = (timeslot, screeningId) => {
        // Navigate to the booking page with the selected timeslot
        navigate(`/book/${movieName}/${timeslot}`);
    };


    if (loading) return <p>Loading multiplexes...</p>;
    if (error) return <p>Error: {error}</p>;

    const multiplexesWithScreenings = multiplexes.filter(multiplex => 
        multiplex.movies.some(movie => 
            movie.movieName === movieName && 
            movie.screenings.some(screening => screening.availableSeats.length > 0 && new Date(screening.timeSlot).toISOString().split('T')[0] === date)
        )
    );

    if (multiplexesWithScreenings.length === 0) {
        return (
            <div className="vh-100 d-flex align-items-center justify-content-center" style={{ backgroundImage: 'url(https://c4.wallpaperflare.com/wallpaper/607/847/687/deadpool-2-hd-4k-movies-wallpaper-preview.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="container bg-white rounded shadow p-4" style={{ opacity: 0.9 }}>
                    <h1 className="text-black text-center">
                        Oops... No multiplexes are currently screening <span className="text-primary">{movieName}</span>
                    </h1>
                </div>
            </div>
        );
    }

    return (
        <div className="vh-100 d-flex align-items-center justify-content-center" style={{ backgroundImage: 'url(https://c4.wallpaperflare.com/wallpaper/607/847/687/deadpool-2-hd-4k-movies-wallpaper-preview.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className="container bg-white rounded shadow p-4" style={{ opacity: 0.9 }}>
                <div className="text-center mb-4">
                    <h1 className="text-black" style={{ fontSize: '2.5rem' }}>
                        Available Multiplexes for <span className="text-primary">{movieName}</span>
                    </h1>
                    <h2 className="text-black" style={{ fontSize: '1.5rem' }}>
                        on <span className="font-weight-bold">{new Date(date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    </h2>
                </div>

                <div className="row">
                    {multiplexes.map(multiplex => {
                        const availableScreenings = multiplex.movies.flatMap(movie =>
                            movie.movieName === movieName ? movie.screenings.filter(screening => {
                                const screeningDate = new Date(screening.timeSlot).toISOString().split('T')[0];
                                return screening.availableSeats.length > 0 && screeningDate === date;
                            }) : []
                        );

                        if (availableScreenings.length === 0) return null;

                        return (
                            <div key={multiplex.multiplexId} className="col-md-4 mb-4">
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">{multiplex.multiplexName}</h5>
                                        <p className="card-text">{multiplex.multiplexLocation}</p>
                                        <div className="d-flex flex-wrap">
                                            {availableScreenings.map(screening => (
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
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}


export default MultiplexListForMovie;




{/* <h1 className="text-center mb-4">
                Available Multiplexes for <span className="text-primary">{movieName}</span> on <span className="text-primary">{date}</span>
            </h1> */}

{/* <h1 className="text-center mb-4" style={{ color: 'black' }}>
    Available Multiplexes for <span className="text-primary">{movieName}</span> on <span className="font-weight-bold">{new Date(date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
</h1> */}


// return (
//     <div className="container">
//         <h1 className="text-center mb-4">
//             Available Multiplexes for <span className="text-primary">{movieName}</span>
//         </h1>
//         <div className="row">
//             {multiplexes.map(multiplex => {
//                 // Check if there are any available screenings for the selected movie
//                 const availableScreenings = multiplex.movies.flatMap(movie =>
//                     movie.movieName === movieName ? movie.screenings.filter(screening => screening.availableSeats.length > 0) : []
//                 );

//                 // Only render the multiplex box if there are available screenings
//                 if (availableScreenings.length === 0) return null;

//                 return (
//                     <div key={multiplex.multiplexId} className="col-md-4 mb-4">
//                         <div className="card">
//                             <div className="card-body">
//                                 <h5 className="card-title">{multiplex.multiplexName}</h5>
//                                 <p className="card-text">{multiplex.multiplexLocation}</p>
//                                 <h6>Available Timeslots:</h6>
//                                 <div className="d-flex flex-wrap">
//                                     {availableScreenings.map(screening => (
//                                         <button
//                                             key={screening.screeningId}
//                                             className="timeslot-box border rounded p-2 m-1 bg-primary text-white"
//                                             style={{ cursor: 'pointer' }}
//                                             onClick={() => handleTimeslotClick(screening.timeSlot)}
//                                         >
//                                             {new Date(screening.timeSlot).toLocaleTimeString([], {
//                                                 hour: '2-digit',
//                                                 minute: '2-digit',
//                                             })}
//                                         </button>
//                                     ))}
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 );
//             })}
//         </div>
//     </div>
// );
// }



// return (
//     <div className="container">
//         <h1 className="text-center mb-4">
//             Available Multiplexes for <span className="text-primary">{movieName}</span> on <span className="text-primary">{date}</span>
//         </h1>
//         <div className="row">
//             {multiplexes.map(multiplex => {
//                 // Check if there are any available screenings for the selected movie on the specified date
//                 const availableScreenings = multiplex.movies.flatMap(movie =>
//                     movie.movieName === movieName ? movie.screenings.filter(screening => {
//                         const screeningDate = new Date(screening.timeSlot).toISOString().split('T')[0]; // Extract date part
//                         return screening.availableSeats.length > 0 && screeningDate === date; // Match date and check available seats
//                     }) : []
//                 );

//                 // Only render the multiplex box if there are available screenings
//                 if (availableScreenings.length === 0) return null;

//                 return (
//                     <div key={multiplex.multiplexId} className="col-md-4 mb-4">
//                         <div className="card">
//                             <div className="card-body">
//                                 <h5 className="card-title">{multiplex.multiplexName}</h5>
//                                 <p className="card-text">{multiplex.multiplexLocation}</p>
//                                 <h6>Available Timeslots:</h6>
//                                 <div className="d-flex flex-wrap">
//                                     {availableScreenings.map(screening => (
//                                         <button
//                                             key={screening.screeningId}
//                                             className="timeslot-box border rounded p-2 m-1 bg-primary text-white"
//                                             style={{ cursor: 'pointer' }}
//                                             onClick={() => handleTimeslotClick(screening.timeSlot, screening.screeningId)}
//                                         >
//                                             {new Date(screening.timeSlot).toLocaleTimeString([], {
//                                                 hour: '2-digit',
//                                                 minute: '2-digit',
//                                             })}
//                                         </button>
//                                     ))}
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 );
//             })}
//         </div>
//     </div>
// );
// }