import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { deleteContent, getAllContent } from "../../../services/movieService";
const Movie = ({ movie }) => {
  const [movies, setMovies] = useState(movie);
  const navigate = useNavigate();
  const fetchContent = async () => {
    const response = await getAllContent();
    setMovies(response.data);
  };

  const handleDelete = async (id) => {
    await deleteContent(id);
    fetchContent();
  };
  return (
    <>
      <div className="col-md-4">
        <div className="movie">
          <div className="movie-img" />
          <div className="text-movie-cont">
            <div className="mr-grid">
              <div className="col1">
                <h1>{movies.title}</h1>
                <ul className="movie-gen">
                  <li>{movies.quality}</li>
                  <li>{movies.duration}</li>
                  <li>{movies.genre_ID}</li>
                </ul>
              </div>
            </div>
            <div className="mr-grid summary-row">
              <div className="col2">
                <h5>SUMMARY</h5>
              </div>
            </div>
            <div className="mr-grid">
              <div className="col1">
                <p className="movie-description">{movies.description}</p>
              </div>
            </div>
            <div className="mr-grid actors-row">
              <div className="col1">
                <p className="movie-actors">{movies.cast}</p>
              </div>
            </div>
            <button
              className="btn btn-default text-white"
              onClick={() => navigate("/editContent/" + movies._id)}
            >
              Edit
            </button>
            <button
              className="btn btn-danger"
              onClick={() => handleDelete(movies._id)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Movie;
