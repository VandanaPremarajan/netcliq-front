import React, { useState, useEffect, useRef } from "react";
import { AutoComplete, Input, Spin } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import { searchAllContent } from "../../services/movieService";
import { Link } from "react-router-dom";
import "./css/SearchContent.css";

const SearchContent = () => {
  const inputRef = useRef(null);
  const [movies, setMovies] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const authToken = localStorage.getItem(Token_name);

  const fetchMovies = async (reset = false) => {
    setLoading(true);
    try {
      const params = {
        page: reset ? 1 : page,
        limit: 12,
        search,
      };
      const response = await searchAllContent(authToken, params);
      if (reset) {
        setMovies(response.data.data);
      } else {
        setMovies((prev) => [...prev, ...response.data.data]);
      }

      setHasMore(
        response.data.page * response.data.limit < response.data.total
      );
      setPage((prev) => (reset ? 2 : prev + 1));
    } catch (err) {
      console.error("Error fetching movies:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = async (value) => {
    setSearch(value);
    setPage(1);

    if (value.trim() === "") {
      setSuggestions([]);
      return;
    }

    // Suggestion API call
    try {
      const params = {
        page: 1,
        limit: 5,
        search: value,
      };
      const response = await searchAllContent(authToken, params);
      const titles = response.data.data.map((movie) => ({
        value: movie.title,
        label: (
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <img
              src={movie.poster}
              alt={movie.title}
              style={{ width: 40, height: 60, objectFit: "cover", borderRadius: 4 }}
            />
            <span>{movie.title}</span>
          </div>
        ),
      }));
      setSuggestions(titles);
    } catch (error) {
      console.error("Error loading suggestions:", error);
    }
  };

  useEffect(() => {
    fetchMovies(true); 
    inputRef.current?.focus();
  }, [search]);

  return (
    <div className="container-fluid search-page bg-dark text-white py-3">
      <div className="search-box mb-4 text-center">
        <AutoComplete
          options={suggestions}
          onSelect={(value) => {
            setSearch(value);
            setPage(1);
          }}
          onSearch={handleSearchChange}
          style={{ width: 400 }}
        >
          <Input.Search
            placeholder="Search movies, shows..."
            enterButton
            allowClear
            ref={inputRef}
            onSearch={(value) => {
              setSearch(value);
              setPage(1);
            }}
          />
        </AutoComplete>
      </div>

      <InfiniteScroll
        dataLength={movies.length}
        next={() => fetchMovies()}
        hasMore={hasMore}
        loader={<div className="text-center"><Spin size="large" /></div>}
        endMessage={<p className="text-center mt-4">No more movies</p>}
      >
        <div className="search-grid">
          {movies.map((movie) => (
            <Link to={`/subscriber/watch/${movie._id}`} key={movie._id}>
              <div className="search-card">
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="search-poster-img"
                />
                <div className="search-info">
                  <strong>{movie.title}</strong>
                  <p style={{ margin: 0 }}>
                    {movie.year} • {movie.quality}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default SearchContent;
