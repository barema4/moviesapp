import React from 'react';
import {Route, Routes } from 'react-router-dom';
import MovieList from '../src/components/MovieList';
import MovieDetail from './components/MovieDetail';

const App = () => {
  return (
      <Routes>
         <Route path="/" element={<MovieList/>} />
         <Route path="/:id" element={<MovieDetail/>} />
      </Routes>
  );
};

export default App;

