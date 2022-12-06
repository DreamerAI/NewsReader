import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const baseUrl = 'https://hacker-news.firebaseio.com/v0/';
const newStoriesUrl = `${baseUrl}newstories.json`;

const selectTitles = ({ title, id } = {}) => ({
  title,
  id,
});
const selectFields = ({ id, by, url, time, title, kids, text } = {}) => ({
  id,
  by,
  url,
  time,
  title,
  kids,
  text,
});

// GETTING ARRAY OF NEWS OBJECTS
export const fetchNews = createAsyncThunk(
  'news/fetchNews',
  async function (_, { rejectWithValue }) {
    try {
      const response = await axios.get(newStoriesUrl);
      // Check for error
      const { data } = response;
      let newsArray = data.slice(0, 100);
      const promises = await Promise.all(
        newsArray.map((newsId) =>
          fetch(`https://hacker-news.firebaseio.com/v0/item/${newsId}.json`)
        )
      );
      const productsArray = await Promise.all(promises.map((p) => p.json()));
      const sortedArray = productsArray.map((newsId) => selectTitles(newsId));
      console.log(sortedArray);
      return sortedArray;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// GETTING newsPostOnClick
const newsPostUrl = 'https://hacker-news.firebaseio.com/v0/item/';

export const fetchNewsById = createAsyncThunk(
  'news/fetchNewsById',
  async function (newsId, { rejectWithValue, getState, dispatch }) {
    try {
      const response = await axios.get(`${newsPostUrl + newsId}.json`);
      const { data } = response;
      const newsPostData = selectFields(data);
      dispatch(selectNewsPage(newsPostData));
      return newsPostData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const newsSlice = createSlice({
  name: 'news',
  initialState: {
    newsIds: [],
    newsPage: null,
    pageStatus: null,
    newsRefreshed: true,
    status: null,
    error: null,
  },
  reducers: {
    handleRefresh(state, action) {
      state.newsRefreshed = action.payload;
    },
    selectNewsPage(state, action) {
      state.newsPage = action.payload;
    },
    // addTodo(state, action) {
    //   state.todos.push(action.payload);
    // },
    // removeTodo(state, action) {
    //   state.todos = state.todos.filter((todo) => todo.id !== action.payload.id);
    // },
    // toggleTodoComplete(state, action) {
    //   const toggledTodo = state.todos.find((todo) => todo.id === action.payload.id);
    //   toggledTodo.completed = !toggledTodo.completed;
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchNews.pending, (state) => {
      state.status = 'loading';
      state.error = null;
    });
    builder.addCase(fetchNews.fulfilled, (state, action) => {
      state.status = 'resolved';
      state.newsIds = action.payload;
      state.newsRefreshed = true;
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
      state.newsRefreshed = true;
    });
    builder.addCase(fetchNewsById.rejected, (state, action) => {
      state.pageStatus = 'rejected';
      state.error = action.payload;
    });
  },
});
export const { handleRefresh, selectNewsPage } = newsSlice.actions;
export default newsSlice.reducer;
