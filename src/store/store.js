import { configureStore } from '@reduxjs/toolkit';
import newsReducer from './slices/newsSlice';

export default configureStore({
  reducer: {
    news: newsReducer,
  },
});
