import React, { useEffect, useState } from 'react';
import { fetchComments } from '../services/fetchComments';
import { Comment } from './Comment';

import styles from './CommentsSection.module.scss';

function CommentSection({ commentIds }) {
  const [comment, setComment] = useState([]);

  // const fetchComments = async (commentIds) => {
  //   try {
  //     const promises = await Promise.all(
  //       commentIds.map((newsId) =>
  //         fetch(`https://hacker-news.firebaseio.com/v0/item/${newsId}.json`)
  //       )
  //     );
  //     const res = await Promise.all(promises.map((p) => p.json()));
  //     console.log('getData');
  //     console.log(res);
  //     setComment(res);
  //     return res;
  //   } catch (error) {
  //     return console.error(error);
  //   }
  // };

  useEffect(() => {
    fetchComments(commentIds).then((data) => data && setComment(data));
  }, [commentIds]);

  return (
    <div className={styles.container}>
      {commentIds.slice(0, commentIds.length).map(
        (id, i) =>
          id && (
            <div key={id}>
              <Comment commentId={comment[i]} />
            </div>
          )
      )}
    </div>
  );
}

export default CommentSection;
