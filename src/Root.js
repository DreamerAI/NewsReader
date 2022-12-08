import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, NavLink } from 'react-router-dom';
import { fetchNews, handleRefresh } from './slices/newsSlice';

import styles from './root.module.scss';

function App() {
  const [searchInput, setSearchInput] = useState('');

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
  }, [newsRefreshed, dispatch]);

  return (
    <div className={styles.main}>
      <div className={styles.sidebar}>
        <h1>News</h1>
        <div className={styles.nav__input}>
          <input
            id="q"
            aria-label="Search contacts"
            placeholder="Search"
            type="search"
            name="q"
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <div>
            <button
              type="submit"
              className="sidebar__btn--update"
              onClick={() => dispatch(handleRefresh())}>
              Update
            </button>
          </div>
        </div>
        <nav className={styles.nav}>
          <ul>
            {status === 'loading' && <h2>Loading News...</h2>}
            {error && <h2> An error occured: {error}</h2>}
            {newsIds
              .filter((item) => {
                return Object.values(item)
                  .join('')
                  .toLowerCase()
                  .includes(searchInput.toLowerCase());
              })
              .map((newsId, index) => (
                <li key={newsId.id}>
                  <NavLink to={`news/${newsId.id}`}>{newsId.title}</NavLink>
                </li>
              ))}
          </ul>
        </nav>
      </div>
      <div className={styles.detail} id="detail">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
