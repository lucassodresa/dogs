import React, { useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { UserContext } from "../../Contexts/UserContext";
import PhotoCommentsForm from "./PhotoCommentsForm";
import styles from "./PhotoComments.module.css";

const PhotoComments = ({ id, comments: commentsProps, isSingle }) => {
  const [comments, setComments] = useState(commentsProps);
  const commentsSection = useRef(null);
  const { isLoggedIn } = useContext(UserContext);

  useEffect(() => {
    const commentsSectionElement = commentsSection.current;
    commentsSectionElement.scrollTop = commentsSectionElement.scrollHeight;
  }, [comments]);

  return (
    <>
      <ul
        ref={commentsSection}
        className={`${styles.comments} ${isSingle ? styles.single : ""}`}
      >
        {comments.map(({ comment_ID, comment_author, comment_content }) => (
          <li key={comment_ID}>
            <b>{comment_author}: </b>
            <span>{comment_content}</span>
          </li>
        ))}
      </ul>
      {isLoggedIn && (
        <PhotoCommentsForm
          isSingle={isSingle}
          id={id}
          setComments={setComments}
        />
      )}
    </>
  );
};

PhotoComments.defaultProps = {};

PhotoComments.propTypes = {
  id: PropTypes.string,
  comments: PropTypes.array,
  isSingle: PropTypes.bool,
};

export default PhotoComments;
