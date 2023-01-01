import { createSlice } from '@reduxjs/toolkit';

import { fetchNews } from '../../services/fetchNews';
import { fetchNewsById } from '../../services/fetchNewsById';

const newsSlice = createSlice({
  name: 'news',
  initialState: {
    newsIds: [],
    status: null,
    newsPage: null,
    pageStatus: null,
    error: null,
    darkMode: false,
  },
  reducers: {
    toggleTheme(state, action) {
      state.darkMode = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchNews.pending, (state) => {
      state.status = 'loading';
      state.error = null;
    });
    builder.addCase(fetchNews.fulfilled, (state, action) => {
      state.status = 'resolved';
      state.newsIds = action.payload;
    });
    builder.addCase(fetchNews.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    });
    // FETCH NEWSPAGE
    builder.addCase(fetchNewsById.pending, (state) => {
      state.pageStatus = 'loading';
      state.error = null;
    });
    builder.addCase(fetchNewsById.fulfilled, (state, action) => {
      state.pageStatus = 'resolved';
      state.newsPage = action.payload;
    });
    builder.addCase(fetchNewsById.rejected, (state, action) => {
      state.pageStatus = 'rejected';
      state.error = action.payload;
    });
  },
});
export const { handleRefresh, toggleTheme } = newsSlice.actions;
export default newsSlice.reducer;
