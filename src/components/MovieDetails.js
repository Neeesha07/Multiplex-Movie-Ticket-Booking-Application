import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, Clock, Film } from 'lucide-react';
import BookingModal from './BookingModal';

const movies = [
    { 
      id: 1, 
      title: 'Inception', 
      image: 'https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg', 
      rating: 'A',
      description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
      genre: 'Sci-Fi, Action',
      duration: '2h 28min'
    },
    { 
      id: 2, 
      title: 'The Dark Knight', 
      image: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg', 
      rating: 'A',
      description: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
      genre: 'Action, Crime, Drama',
      duration: '2h 32min'
    },
    { 
      id: 3, 
      title: 'Interstellar', 
      image: 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg', 
      rating: 'U',
      description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.',
      genre: 'Adventure, Drama, Sci-Fi',
      duration: '2h 49min'
    },
  ];
  
const MovieDetails = () => {
  const [showModal, setShowModal] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const movie = movies.find(m => m.id === parseInt(id));

  if (!movie) {
    return <div>Movie not found</div>;
  }

  return (
    <div className="container-fluid py-4 bg-light min-vh-100 d-flex align-items-center">
      <div className="row justify-content-center">
        <div className="col-md-4 text-center">
          <img src={movie.image} alt={movie.title} className="img-fluid rounded shadow-lg" />
        </div>
        <div className="col-md-8">
          <h1 className="mb-3 text-primary">{movie.title}</h1>
          <p className="mb-3">
            <Star className="text-warning me-2" size={24} />
            <span className="fs-4">{movie.rating}</span>
          </p>
          <h3>About the movie</h3>
          <p className="mb-3 fs-5">{movie.description}</p>
          <p className="mb-3">
            <Film className="me-2" size={18} />
            <span className="me-3">{movie.genre}</span>
            <Clock className="me-2" size={18} />
            <span>{movie.duration}</span>
          </p>
          <button className="btn btn-primary btn-lg" onClick={() => setShowModal(true)}>Book Now</button>
          <button className="btn btn-secondary btn-lg ms-3" onClick={() => navigate('/')}>Back to Movies</button>
        </div>
      </div>

      <BookingModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        movie={movie}
      />
    </div>
  );
};

export default MovieDetails;