import React from 'react';
import { Star } from 'lucide-react';

const MovieCard = ({ movie }) => (
  <div className="container-fluid card  d-flex h-100 shadow-lg transition-transform hover:scale-105">
    <img 
      src={movie.image}
      className="card-img-top img-fluid" 
      alt={movie.title}
      style={{  objectFit: 'cover' }}
    />
    <div className="card-body d-flex flex-column bg-dark text-light">
      <h5 className="card-title">{movie.title}</h5>
      <p className="card-text">
        <Star className="text-warning" size={18} />
        <span className="ms-1">{movie.rating}/10</span>
      </p>
      {/* <button className="btn btn-primary mt-auto">View Details</button> */}
    </div>
  </div>
);

export default MovieCard;