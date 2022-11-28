import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, NavLink } from 'react-router-dom';
import { fetchNews, fetchNewsById, handleRefresh } from './slices/newsSlice';

function App() {
  // const [newsIds, setNewsIds] = useState([]);

  const [newsUpdate, setNewsUpdate] = useState(true);
  const newsIds = useSelector((state) => state.news.newsIds);
  const { status, error, newsRefreshed } = useSelector((state) => state.news);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(handleRefresh(newsRefreshed));
    dispatch(fetchNews());
    const interval = setInterval(() => {
      dispatch(fetchNews());
    }, 120000);
    return () => clearInterval(interval);
    // async function getNewsIds() {
    //   const response = await axios.get(newStoriesUrl);
    //   const { data } = response;
    //   let newsArray = data.slice(0, 100);
    //   console.log(newsArray);
    //   setNewsIds(newsArray);
    //   setNewsUpdate(true);
    // }
    // getNewsIds();
  }, [newsRefreshed]);
  // const productsArray = await Promise.all(promises.map(p => p.json()))

  return (
    <>
      <div id="sidebar">
        <h1>News</h1>
        <div>
          <form id="search-form" role="search">
            <input
              id="q"
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
            />
            <div id="search-spinner" aria-hidden hidden={true} />
            <div className="sr-only" aria-live="polite"></div>
          </form>
          <div>
            <button
              type="submit"
              className="sidebar__btn--update"
              onClick={() => dispatch(handleRefresh())}>
              Update
            </button>
          </div>
        </div>
        <nav>
          <ul>
            {status === 'loading' && <h2>Loading News...</h2>}
            {error && <h2> An error occured: {error}</h2>}
            {newsUpdate
              ? newsIds.map((newsId, index) => (
                  <li key={newsId.id}>
                    <NavLink to={`news/${newsId.id}`}>{newsId.title}</NavLink>
                  </li>
                ))
              : null}
          </ul>
        </nav>
      </div>
      <div id="detail">
        <Outlet />
      </div>
    </>
  );
}

export default App;
