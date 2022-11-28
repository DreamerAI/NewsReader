import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchNewsById } from '../slices/newsSlice';

export default function News() {
  const dispatch = useDispatch();
  const { newsPage, pageStatus, error } = useSelector((state) => state.news);
  const { newsId } = useParams();

  useEffect(() => {
    dispatch(fetchNewsById(newsId));
    // async function getNewsPost() {
    //   const response = await axios.get(`${newPostUrl + newsId}.json`);
    //   const { data } = response;
    //   let newsPostData = selectFields(data);
    //   setNewsPost(newsPostData);
    // }
    // getNewsPost();
  }, [newsId]);

  return (
    <div id="contact">
      {error && <h2> An error occured: {error}</h2>}
      {newsPage && (
        <>
          <h1>{newsPage.title}</h1>
          <span>By:{newsPage.by}</span>
          <p>{newsPage.text}</p>
        </>
      )}
      )
    </div>
  );
}
