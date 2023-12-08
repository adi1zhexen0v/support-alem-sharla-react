import { createSlice } from '@reduxjs/toolkit';
import { AppReview } from '../../utils/interfaces';

interface ReviewsState {
  reviewsList: AppReview[];
}

const initialState: ReviewsState = {
  reviewsList: []
};

export const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    addReviews(state, action) {
      state.reviewsList = action.payload;
    }
  }
});

export const { addReviews } = reviewsSlice.actions;
export default reviewsSlice.reducer;