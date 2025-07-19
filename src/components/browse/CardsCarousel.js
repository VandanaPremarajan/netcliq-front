import React from 'react';
import { APP_URL } from '../../constants/api_settings';

const MovieCardsCarousel = ({ movies }) => {
  // Chunk movies into groups of 4 per slide
  const chunked = [];
  for (let i = 0; i < movies.length; i += 4) {
    chunked.push(movies.slice(i, i + 4));
  }

  return (
    <div className="container">
      <h4 className="text-white mb-3 mt-5">Trending Now</h4>
      <div id="movieCarousel" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          {chunked.map((group, index) => (
            <div
              className={`carousel-item ${index === 0 ? 'active' : ''}`}
              key={index}
            >
              <div className="row">
                {group.map((movie) => (
                  <div className="col-6 col-md-3" key={movie._id}>
                    <div className="card bg-dark text-white border-0 mb-3">
                      <img
                        src={APP_URL+movie.poster}
                        className="card-img"
                        alt={movie.title}
                        style={{ height: '250px', objectFit: 'cover' }}
                      />
                      <div className="card-body">
                        <h6 className="card-title">{movie.title}</h6>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Controls */}
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#movieCarousel"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" />
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#movieCarousel"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" />
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
};

export default MovieCardsCarousel;
