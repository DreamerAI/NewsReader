import React from 'react';
import CommentSection from '../CommentsSection/CommentsSection';
import { getPostTime } from '../../utils/helpers/getPostTime';

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
              {commentId.by}&nbsp;[{commentId.id}] &nbsp;&nbsp;
              {getPostTime(commentId)}
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
