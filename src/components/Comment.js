import React from 'react';
import CommentSection from './CommentsSection';

import styles from './Comment.module.scss';

export const Comment = ({ commentId }) => {
  console.log(commentId);
  // const fetchComments = async (id) => {
  //   try {
  //     const res = await axios.get(`${itemUrl + id}.json`).then(({ data }) => data);
  //     return res;
  //   } catch (error) {
  //     return console.error(error);
  //   }
  // };

  // useEffect(() => {
  //   fetchComments(commentId).then((data) => data && data.type && setComment(data));
  // }, []);

  const createMarkup = (markup) => ({
    __html: markup,
  });

  return (
    <div>
      {commentId && !commentId.deleted && (
        <>
          <div>
            <p className={styles.comment__author}>
              {commentId.by}&nbsp;[{commentId.id}]
            </p>
            <div
              dangerouslySetInnerHTML={createMarkup(commentId.text)}
              className={styles.comment__text}></div>
          </div>

          {commentId.kids && <CommentSection commentIds={commentId.kids} />}
        </>
      )}
    </div>
  );
};
