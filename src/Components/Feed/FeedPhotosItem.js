import React, { useCallback } from "react";
import PropTypes from "prop-types";
import styles from "./FeedPhotosItem.module.css";
import Image from "../Helper/Image";

const FeedPhotosItem = ({ photo, setModalPhoto }) => {
  const handleClick = useCallback(
    () => setModalPhoto(photo),
    [photo, setModalPhoto]
  );
  if (!photo) return null;

  const { src, title, acessos: views } = photo;

  return (
    <li className={styles.photo} onClick={handleClick}>
      <Image src={src} alt={title} />
      <span className={styles.views}>{views}</span>
    </li>
  );
};

FeedPhotosItem.defaultProps = {
  photo: null,
  setModalPhoto: () => {},
};

FeedPhotosItem.propTypes = {
  photo: PropTypes.object,
  setModalPhoto: PropTypes.func,
};
export default FeedPhotosItem;
