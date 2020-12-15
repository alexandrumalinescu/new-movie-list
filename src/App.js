import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import MovieList from './components/MovieList';
import './App.css';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import AddFavourites from './components/AddFavourites';

const App = ()=>{
  const [movies, setMovies] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [searchValue, setSearchValue] = useState('')

  const getMovieRequest = async (searchValue) =>{
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=a4e64186`;

    const response = await fetch(url);
    const responseJson = await response.json();
    console.log(responseJson);

    if(responseJson.Search){
      setMovies(responseJson.Search);
    }
    
  }

  useEffect(()=>{getMovieRequest(searchValue);}, [searchValue]);

  const addFavouriteMovie = (movie) => {
    const newFavouriteList = [...favourites, movie];
    setFavourites(newFavouriteList);
  }

  return(
    <div className='container-fluid movie-app'>
      <div className='row d-flex align-items-center mt-4 mb-4 mr-3'>
        <MovieListHeading heading='Movies'/>
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue}/>
      </div>
      <div className='row'>
        <MovieList 
        movies = {movies} 
        handleFavouritesClick={addFavouriteMovie}  
        favouriteComponent={AddFavourites}
        /> 
      </div>
      <div className='row d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading heading='Favourites'/>
      </div>
      <div className='row'>
        <MovieList 
        movies = {favourites} 
        handleFavouritesClick={addFavouriteMovie}  
        favouriteComponent={AddFavourites}
        /> 
      </div>
      
    </div>
  )
}

export default App;
