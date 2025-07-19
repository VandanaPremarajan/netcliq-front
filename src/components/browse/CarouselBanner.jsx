import { APP_URL } from '../../constants/api_settings';

const CarouselBanner = ({ movies }) => {
  return (
    <div id="carouselExample" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-inner">
        {movies.map((movie, idx) => (
          <div
            className={`carousel-item ${idx === 0 ? 'active' : ''}`}
            key={movie._id}
          >
            <div className="position-relative" style={{ height: '92vh', overflow: 'hidden' }}>
              <img
                src={APP_URL+movie.poster}
                className="d-block w-100"
                alt={movie.title}
                style={{ objectFit: 'cover', height: '100%' }}
              />
              <div
                className="carousel-caption d-none d-md-block text-start"
                style={{
                  background: 'rgba(0,0,0,0.6)',
                  padding: '20px',
                  borderRadius: '10px',
                  maxWidth: '600px',
                }}
              >
                <h2>{movie.title}</h2>
                <p>{movie.description}</p>
                <div className="mt-3">
                  <button className="btn btn-danger me-2">▶ Play</button>
                  <button className="btn btn-light">More Info</button>
                </div>
                <p className="mt-2 small text-muted">
                  {movie.year} • {movie.duration} • {movie.quality}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" />
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
        <span className="carousel-control-next-icon" />
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default CarouselBanner;
