import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const newsPostUrl = 'https://hacker-news.firebaseio.com/v0/item/';

const selectFields = ({ id, by, url, time, title, kids, text } = {}) => ({
  id,
  by,
  url,
  time,
  title,
  kids,
  text,
});

export const fetchNewsById = createAsyncThunk(
  'news/fetchNewsById',
  async function (newsId, { rejectWithValue }) {
    try {
      const response = await axios.get(`${newsPostUrl + newsId}.json`);
      const { data } = response;
      const newsPostData = selectFields(data);
      return newsPostData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
