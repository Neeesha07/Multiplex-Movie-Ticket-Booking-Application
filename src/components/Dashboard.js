import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import MovieCard from './MovieCard';
import Welcome from './Welcome';
import Navbar from './Navbar';

const movies = [
  { 
    id: 1, 
    title: 'Inception', 
    image: 'https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg', 
    rating: 8.8,
    description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
    genre: 'Sci-Fi, Action',
    duration: '2h 28min'
  },
  { 
    id: 2, 
    title: 'The Dark Knight', 
    image: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg', 
    rating: 9,
    description: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
    genre: 'Action, Crime, Drama',
    duration: '2h 32min'
  },
  { 
    id: 3, 
    title: 'Interstellar', 
    image: 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg', 
    rating: 8.6,
    description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.',
    genre: 'Adventure, Drama, Sci-Fi',
    duration: '2h 49min'
  },
];

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container-fluid py-4 bg-light">
      <Welcome />
      <Navbar/>
      <div className="mb-4 position-relative">
        <input
          type="text"
          className="form-control form-control-lg"
          placeholder="Search for movies..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <Search className="position-absolute top-50 end-0 translate-middle-y me-3" size={24} />
      </div>

      <h2 className="mb-3 text-primary">Featured Movies</h2>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {filteredMovies.map((movie) => (
          <div key={movie.id} className="col">
            <Link to={`/movie/${movie.id}`} className="text-decoration-none">
              <MovieCard movie={movie} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;