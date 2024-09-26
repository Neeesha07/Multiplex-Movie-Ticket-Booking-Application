import React, { useEffect, useState } from 'react';

const TestFetch = () => {
    const [movies, setMovies] = useState([]); // Initialize as an empty array
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await fetch('https://api.example.com/movies'); // Replace with your API URL
                if (!response.ok) throw new Error('Network response was not ok');

                const data = await response.json();
                console.log(data); // Log the response data to check its structure

                // Adjust according to your API's response structure
                setMovies(data.movies || []); // Set to an empty array if movies is undefined
            } catch (err) {
                console.error('Fetch error:', err);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error fetching data!</div>;

    return (
        <div>
            <h2>Fetched Movies:</h2>
            <ul>
                {movies.length > 0 ? ( // Check if there are any movies to display
                    movies.map((movie, index) => (
                        <li key={index}>{movie.title}</li> // Adjust based on your data structure
                    ))
                ) : (
                    <li>No movies found.</li> // Handle the case where no movies are available
                )}
            </ul>
        </div>
    );
};

export default TestFetch;
