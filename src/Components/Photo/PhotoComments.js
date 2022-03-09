import React, { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../../Contexts/UserContext";
import PhotoCommentsForm from "./PhotoCommentsForm";
import styles from "./PhotoComments.module.css";

const PhotoComments = ({ id, comments: commentsProps }) => {
  const [comments, setComments] = useState(commentsProps);
  const commentsSection = useRef(null);
  const { isLoggedIn } = useContext(UserContext);

  useEffect(() => {
    const commentsSectionElement = commentsSection.current;
    commentsSectionElement.scrollTop = commentsSectionElement.scrollHeight;
  }, [comments]);

  return (
    <>
      <ul ref={commentsSection} className={styles.comments}>
        {comments.map(({ comment_ID, comment_author, comment_content }) => (
          <li key={comment_ID}>
            <b>{comment_author}: </b>
            <span>{comment_content}</span>
          </li>
        ))}
      </ul>
      {isLoggedIn && <PhotoCommentsForm id={id} setComments={setComments} />}
    </>
  );
};

export default PhotoComments;
