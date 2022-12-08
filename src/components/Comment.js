import React from 'react';
import CommentSection from './CommentsSection';

import styles from './Comment.module.scss';

export const Comment = ({ commentId }) => {
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
