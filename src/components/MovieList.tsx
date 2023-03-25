import React,{ useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "../styles/MovieList.css"
import validateSearchInput from '../utils/validateSearchInput';

type Movie = {
  imdbID: string;
  Title: string;
  Year: number;
  Poster: string;
};


const MovieList = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [errorMessage, setErrorMessage] = useState('')
  const [backendError, setbackendError] = useState('')


  
  const MOVIE_API_URL = `https://www.omdbapi.com/?s=man&page=${page}&apikey=6f9dc29f`;
  useEffect(() => {
    axios.get(MOVIE_API_URL)
    .then(response => {
      setMovies(prevMovies => [ ...prevMovies, ...response.data.Search,]);
    })
    .catch(error => {
      setErrorMessage(error)
    });
  }, [page]);

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    setMovies([])
    event.preventDefault();
    const errors = validateSearchInput(searchTerm)
    if(errors){
      return setErrorMessage(errors)
    } else{
      setErrorMessage('')
      axios.get(`https://www.omdbapi.com/?s=${searchTerm}&apikey=6f9dc29f`)
    .then(response => {
      if(response.data.Error){
        setbackendError(response.data.Error)
      }
      if(response.data.Search){
        setMovies(response.data.Search);
      }
    })
    .catch(error => {
      setbackendError(error);
    });

    }
  };

 
  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      setPage(prevPage => prevPage + 1);
    }
  };


  let poster
  const DEFAULT_PLACEHOLDER_IMAGE =
  "https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_SX300.jpg";
  
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
  <div className="m-8">
    <div className='flex flex-col items-center'>
        <h1 className="ml-6 text-6xl font-bold font-serif text-slate-500">The Movie Search</h1>
        <form className="m-6 flex flex-col items-center" onSubmit={handleSearch}>
          <input className='text-[#e2e8f0] px-4 py-2 w-96 rounded-lg bg-[#334155] outline-0 ring-4 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500' type="text" value={searchTerm} onChange={event => setSearchTerm(event.target.value)} placeholder="Spider..."  />
          {errorMessage ? <div className='text-red-600'>{errorMessage}</div>: ''}
          <button className="bg-[#0ea5e9] rounded-lg text-white mt-4 w-48 px-2 py-2 border-0 bg-sky-500 hover:bg-sky-700" type="submit">Search</button>
        </form>
    </div>
    {backendError? <div className='flex flex-row text-red-600 justify-center apierror'>{backendError}</div> : <ul className="flex flex-wrap gap-4 justify-center">
      {movies?.map((movie, i) => {
         poster = movie.Poster === "N/A" ? DEFAULT_PLACEHOLDER_IMAGE : movie.Poster;
          return (
              <li key={i}>
                <Link to={`/${movie.imdbID}`} className='movie-item'>
                  <img src={poster} alt={movie.Title} className="w-[250px] h-[350px]"/>
                  <div className="flex flex-col items-center">
                    <p className='text-[14px] w-[150px] mt-4 font-bold text-center'>Title :{movie.Title}</p>
                    <p className='text-[14px] w-[150px] mt-4 font-bold text-center'>Released: {movie.Year}</p>
                  </div>
                </Link>
              </li>
          )
      }
         
      )}
    </ul>}
    
  </div> 
    
    
  );
};

export default MovieList;

