import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, NavLink } from 'react-router-dom';
import { fetchNews } from '../../services/fetchNews';
import { searchByLetters } from '../../utils/helpers/searchByLetters';
import { DarkMode } from '../../utils/UI/ThemeToggle/ThemeToggle';

import styles from './root.module.scss';

function App() {
  const [searchInput, setSearchInput] = useState('');
  const [loading, setLoading] = useState(0);

  const newsIds = useSelector((state) => state.news.newsIds);
  const { status, error, darkMode } = useSelector((state) => state.news);
  const dispatch = useDispatch();
  const theme = darkMode ? 'light' : 'dark';

  const updateNews = useCallback(() => {
    setLoading((s) => s + 1);
  }, []);

  useEffect(() => {
    dispatch(fetchNews());
    const interval = setInterval(() => {
      dispatch(fetchNews());
    }, 120000);
    return () => clearInterval(interval);
  }, [dispatch, loading]);

  return (
    <div className={styles.main} data-theme={theme}>
      <div className={styles.sidebar}>
        <h1>Hacker News</h1>
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
            <button type="submit" onClick={updateNews}>
              Update
            </button>
          </div>
          <DarkMode darkMode={darkMode} />
        </div>
        <nav className={styles.nav}>
          <ul>
            {status === 'loading' && <h2>Loading News...</h2>}
            {error && <h2> An error occured: {error}</h2>}
            {newsIds
              .filter((item) => {
                return searchByLetters(item, searchInput);
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
