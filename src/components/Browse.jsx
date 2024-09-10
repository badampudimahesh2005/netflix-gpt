import React from 'react'
import Header from './Header'
import useNowPlayingMovies from '../hooks/useNowPlayingMovies'        
import MainContainer from './MainContainer' ;
import SecondaryContainer from './SecondaryContainer' ; 
import usePopularMovies from '../hooks/usePopularMovies';
import useTrendingMovies from '../hooks/useTrendingMovies';
import useUpcomingMovies from '../hooks/useUpcomingMovies';
import { useSelector } from 'react-redux';
import GptSearch from './GptSearch';
function Browse() {

  useNowPlayingMovies();
  usePopularMovies();
  useTrendingMovies();
  useUpcomingMovies();

  const showGptSearch = useSelector((Store)=> Store.gpt.showGptSearch);
  
  return (
    <div>
      <Header />
      {showGptSearch ? <GptSearch/> :
      <>
      <MainContainer />
      <SecondaryContainer />
        </>}
    </div>
  )
}

export default Browse;