import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const baseUrl = 'https://hacker-news.firebaseio.com/v0/';
const newStoriesUrl = `${baseUrl}newstories.json`;

const selectTitles = ({ title, id } = {}) => ({
  title,
  id,
});

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
      return sortedArray;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
