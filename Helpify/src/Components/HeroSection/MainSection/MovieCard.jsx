import React from 'react'

const MovieCard = ({ title, genre, image }) => (
    <div className="movie-card">
      <div className="movie-inner">
        <div className="movie-content">
          <img
            src={image}
            alt={title}
            className="movie-image"
          />
          <div className="movie-info">
            <h3 className="movie-title">{title}</h3>
            <span className="movie-genre">{genre}</span>
          </div>
        </div>
      </div>
    </div>
  );

export default MovieCard
