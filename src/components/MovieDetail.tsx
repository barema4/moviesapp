import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

type Movie = {
  imdbID: string;
  Title: string;
  Year: number;
  Poster: string;
  Plot: string;
  Released: string;
  Runtime: string
};

type Params = {
  id: string;
};

const MovieDetail = () => {
  const [movie, setMovie] = useState<Movie | null>(null);
  const { id } = useParams<Params>();
  useEffect(() => {
    axios.get(`https://www.omdbapi.com/?i=${id}&apiKey=6f9dc29f`)
      .then(response => {
        setMovie(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [id]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Title: {movie.Title}</h1>
      <img src={movie.Poster} alt={movie.Title} />
      <p>Year: {movie.Year}</p>
      <p>Plot: {movie.Plot}</p>
      <p>Released: {movie.Released}</p>
      <p>Runtime: {movie.Runtime}</p>
    </div>
  );
};

export default MovieDetail;
