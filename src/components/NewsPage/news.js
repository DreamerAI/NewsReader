import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import DOMPurify from 'dompurify';

import styles from './news.module.scss';

import CommentSection from '../CommentsSection/CommentsSection';

import { getPostTime } from '../../utils/helpers/getPostTime';
import { fetchNewsById } from '../../services/fetchNewsById';

function News() {
  const [commentsUpdate, setCommentsUpdate] = useState(1);
  const { newsPage, error } = useSelector((state) => state.news);
  const { newsId } = useParams();
  const dispatch = useDispatch();

  const handleCommentsUpdate = () => {
    setCommentsUpdate(Math.random());
  };

  const createMarkup = (markup) => ({
    __html: DOMPurify.sanitize(markup),
  });

  useEffect(() => {
    dispatch(fetchNewsById(newsId));
  }, [dispatch, newsId]);
  return (
    <div className={styles.news}>
      {error && <h2> An error occured: {error}</h2>}
      {newsPage && (
        <>
          <div className={styles.headline}>
            <h1 className="news__title">{newsPage.title} </h1>
            <div className={styles.headline__info}>
              <a href={newsPage.url} className={newsPage.url ? null : styles.headline__url}>
                Read more
              </a>

              <p className={styles.author__name}>
                By: {newsPage.by}&nbsp;[{newsPage.id}]&nbsp;&nbsp;
                {getPostTime(newsPage)}
              </p>
            </div>
          </div>
          <div className={styles.author}>
            <div
              dangerouslySetInnerHTML={createMarkup(newsPage.text)}
              className={styles.author__text}></div>
          </div>

          {newsPage.kids && (
            <>
              <div className={styles.comments}>
                <h4>Comments</h4>
                <button
                  type="submit"
                  className="sidebar__btn--update"
                  onClick={handleCommentsUpdate}>
                  Refresh
                </button>
              </div>{' '}
              <CommentSection commentIds={newsPage.kids} key={commentsUpdate} />
            </>
          )}
        </>
      )}
    </div>
  );
}

export default React.memo(News);
