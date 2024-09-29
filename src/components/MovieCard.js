import React from 'react';
import { Circle, Dot, Star } from 'lucide-react';

const MovieCard = ({ movie }) => (
  <div className="container-fluid card shadow-lg transition-transform hover:scale-105" style={{ maxWidth: '400px' }}>
  <div className="position-relative" style={{ paddingBottom: '150%' }}>
    <img 
      src={movie.moviePoster}
      className="card-img-top position-absolute w-100 h-100"
      alt={movie.movieName}
      style={{ objectFit: 'cover', top: 0, left: 0 }}
    />
  </div>
  <div className="card-body d-flex flex-column bg-dark text-light p-3">
    <h5 className="card-title fs-4 mb-2">{movie.movieName}</h5>
    <p className="card-text mb-0">
      <Dot className="text-warning" size={20} />
      <span className="ms-2 fw-semibold">{movie.movieRating}</span>
    </p>
  </div>
</div>
);

export default MovieCard;