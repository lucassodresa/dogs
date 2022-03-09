import React, { useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import useFetch from "../../Hooks/useFetch";
import Error from "../Helper/Error";
import Loading from "../Helper/Loading";
import { PHOTO_GET } from "../../Utils/api";

import styles from "./FeedModal.module.css";
import PhotoContent from "../Photo/PhotoContent";

const FeedModal = ({ photo, setModalPhoto }) => {
  const { data, error, loading, request } = useFetch();

  useEffect(() => {
    const { url, options } = PHOTO_GET(photo.id);
    request(url, options);
  }, [photo, request]);

  const handleOutsideClick = useCallback(
    ({ target, currentTarget }) => {
      if (target === currentTarget) setModalPhoto(null);
    },
    [setModalPhoto]
  );

  return (
    <div className={styles.modal} onClick={handleOutsideClick}>
      {error && <Error error={error} />}
      {loading && <Loading />}
      {data && <PhotoContent data={data} />}
    </div>
  );
};

FeedModal.defaultProps = {
  photo: null,
};

FeedModal.propTypes = {
  photo: PropTypes.object,
};

export default FeedModal;
