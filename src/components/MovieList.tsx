import React,{ useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

type Movie = {
  imdbID: string;
  Title: string;
  Year: number;
  Poster: string;
};

const MovieList = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  const MOVIE_API_URL = "https://www.omdbapi.com/?s=man&apikey=6f9dc29f";
  useEffect(() => {
    axios.get(MOVIE_API_URL)
    .then(response => {
      setMovies(response.data.Search);
    })
    .catch(error => {
      console.log(error);
    });
  }, []);

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    
    event.preventDefault();

    axios.get(`https://www.omdbapi.com/?s=${searchTerm}&apikey=6f9dc29f`)
    .then(response => {
      setMovies(response.data.Search);
      setSearchTerm('')
    })
    .catch(error => {
      console.log(error);
    });
  };
  let poster
  const DEFAULT_PLACEHOLDER_IMAGE =
  "https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_SX300.jpg";


  return (
    <div>
      <h1>Popular Movies</h1>
      <form onSubmit={handleSearch}>
        <input type="text" value={searchTerm} onChange={event => setSearchTerm(event.target.value)} />
        <button type="submit">Search</button>
      </form>
      <ul>
        {movies.map(movie => {
           
           poster = movie.Poster === "N/A" ? DEFAULT_PLACEHOLDER_IMAGE : movie.Poster;
            return (
                
                <li key={movie.imdbID}>
                  <Link to={`/${movie.imdbID}`}>
                    <img src={poster} alt={movie.Title} />
                    <div>
                      <h2>{movie.Title}</h2>
                      <p>Released: {movie.Year}</p>
                    </div>
                  </Link>
                </li>
            )
        }
           
        )}
      </ul>
    </div>
  );
};

export default MovieList;

