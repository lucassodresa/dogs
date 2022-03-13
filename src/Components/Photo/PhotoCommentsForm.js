import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { ReactComponent as SendIcon } from "../../Assets/send.svg";
import commentSchema from "../../Constants/Schemas/commentSchema";
import useFetch from "../../Hooks/useFetch";
import useForm from "../../Hooks/useForm";
import { COMMENT_POST } from "../../Utils/api";
import Error from "../Helper/Error";
import styles from "./PhotoCommentsForm.module.css";

const PhotoCommentsForm = ({ id, setComments, isSingle }) => {
  const comment = useForm(commentSchema, "comment");
  const { request, error } = useFetch();

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();

      const token = window.localStorage.getItem("token");
      const { url, options } = COMMENT_POST(
        id,
        { comment: comment.value },
        token
      );
      const { response, json } = await request(url, options);

      if (response.ok) {
        comment.setValue("");
        setComments((comments) => [...comments, json]);
      }
    },
    [comment, request, id, setComments]
  );

  return (
    <form
      className={`${styles.form} ${isSingle ? styles.single : ""}`}
      onSubmit={handleSubmit}
    >
      <textarea
        className={styles.textarea}
        id="comment"
        name="comment"
        placeholder="Bark..."
        value={comment.value}
        onChange={comment.onChange}
      />
      <button className={styles.button}>
        <SendIcon />
      </button>
      <Error error={error} />
    </form>
  );
};

PhotoCommentsForm.defaultProps = {};

PhotoCommentsForm.propTypes = {
  id: PropTypes.number,
  setComments: PropTypes.func,
  isSingle: PropTypes.bool,
};

export default PhotoCommentsForm;
