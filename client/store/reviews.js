import axios from "axios";

const FETCH_REVIEWS = "FETCH_REVIEWS";

const _fetchReviews = (reviews) => {
  return {
    type: FETCH_REVIEWS,
    reviews,
  };
};

export const fetchReviews = (product) => {
  return async (dispatch) => {
    const { data: reviews } = await axios.get(
      `/api/reviews/product/${product.id}`
    );
    dispatch(_fetchReviews(reviews));
  };
};

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_REVIEWS:
      return action.reviews;
    default:
      return state;
  }
};
