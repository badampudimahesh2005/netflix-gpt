import React from 'react'
const { IMG_CDN_URL } = require('../utils/constants');

const MovieCard = ({posterPath}) => {
  if (!posterPath) return null;
  return (
    <div className='w-48 pr-4'>
        <img src={IMG_CDN_URL + posterPath} alt="movie card" />
    </div>
  )
}

export default MovieCard;

