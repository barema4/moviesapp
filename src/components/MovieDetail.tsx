import React, { useEffect, useState, memo } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import "../styles/MovieList.css"

type Movie = {
  imdbID: string;
  Title: string;
  Year: number;
  Poster: string;
  Plot: string;
  Released: string;
  Runtime: string;
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
    return <div className='justify-center'>Loading...</div>;
  }

  return (
    <div className='m-8 flex flex-wrap flex-row justify-center movie-details items-center'>
      <div className='basis-1/2 md:shrink-0'>
        <img src={movie.Poster} alt={movie.Title} className="w-[500px] h-[350px]" />
      </div>
      <div className='basis-1/3'>
        <div className='grid grid-cols-2 gap-3 mb-3'>
          <div className='text-xl subpixel-antialiased font-medium'>
            Title
          </div>
          <div className='text-sm subpixel-antialiased font-medium'>
            {movie.Title}
          </div>
        </div>
        <div className='grid grid-cols-2 gap-3 mb-3'>
          <div className='text-xl subpixel-antialiased font-medium'>
            Year
          </div>
          <div className='text-normal subpixel-antialiased font-medium'>
            {movie.Year}
          </div>
        </div>
        <div className='grid grid-cols-2 gap-3 mb-3'>
          <div className='text-xl subpixel-antialiased font-medium'>
            Plot
          </div>
          <div className='text-normal'>
            {movie.Plot}
          </div>
        </div>
        <div className='grid grid-cols-2 gap-3 mb-3'>
          <div className='text-xl subpixel-antialiased font-medium'>
            Released
          </div>
          <div className='text-normal'>
            {movie.Released}
          </div>
        </div>
        <div className='grid grid-cols-2 gap-3 mb-3'>
          <div className='text-xl subpixel-antialiased font-medium'>
            Runtime
          </div>
          <div className='text-normal'>
            {movie.Runtime}
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(MovieDetail);

