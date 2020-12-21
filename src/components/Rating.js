import React, { useState, useEffect } from 'react';
import StarIcon from '@material-ui/icons/StarOutlined';

const useStateWithLocalStorage =  (local) => {
  const [rating, setRating] = useState(
    localStorage.getItem(local) || null);
 
  useEffect(() => {
    localStorage.setItem(local, rating);
  }, [rating,local]);
 
  return [rating, setRating];
};

const Ratings = (props) => {
  const [rating, setRating] = useStateWithLocalStorage(props.movie.id);
  const [hover, setHover] = useState(null);
  
  const setRatings = event => setRating(event.target.value);
 
  return (
    <>
      {[...Array(5)].map((star, index) => {
        const ratingValue = index + 1;
        return (
          <label>
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={setRatings}
            />
            <StarIcon
              value={rating}
              className={
                ratingValue <= (hover || rating) ? 'star' : 'regularStar'
              }
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(null)}
            />
          </label>
        );
      })}
    </>
  );
};

export default Ratings;
