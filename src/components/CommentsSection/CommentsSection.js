import React, { useEffect, useState } from 'react';
import { fetchComments } from '../../services/fetchComments';
import { Comment } from '../Comment/Comment';

import styles from './CommentsSection.module.scss';

function CommentSection({ commentIds }) {
  const [comment, setComment] = useState(null);

  useEffect(() => {
    fetchComments(commentIds).then((data) => data && setComment(data));
  }, [commentIds]);

  return (
    <div className={styles.container}>
      {comment &&
        commentIds.slice(0, commentIds.length).map(
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
