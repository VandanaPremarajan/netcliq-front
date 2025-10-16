import { date_format } from '../../constants/formConstants';
import './css/CardsCarousel.css';
import dayjs from 'dayjs';

const CardsCarousel = ({ movies }) => {
  return (
    <div className="trending-wrapper">
      <h2>Trending Now</h2>
      <div className="trending-scroll">
        {movies.map(movie => {
          const hourTxt = Math.floor(movie.duration / 60) === 1 ? 'hr' : 'hrs';
          return(
            <div className="movie-card" key={movie._id}>
              <img src={movie.poster} alt={movie.title} />
              <div className="movie-info-overlay">
                <h3>{movie.title}</h3>
                <p className="genre">{movie.genre_ID.map(g => g.name).join(', ')}</p>
                <p className="details">
                  {Math.floor(movie.duration / 60)+hourTxt} {movie.duration % 60}mins • {dayjs(movie.release_date).format(date_format)}
                </p>
                <p className="cast"><strong>Cast:</strong> {movie.cast}</p>
                <button className="play-button">▶ Play Now</button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
};

export default CardsCarousel;

