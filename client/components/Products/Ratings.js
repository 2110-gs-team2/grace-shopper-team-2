import React, { Component } from "react";
import StarRatings from "react-star-ratings";

const Ratings = ({ rating, starDimension }) => {
  return (
    <StarRatings
      rating={rating}
      starDimension={starDimension}
      starSpacing="2px"
      starEmptyColor="#D7D9B1"
      starRatedColor="#2D4323"
    />
  );
};

export default Ratings;
