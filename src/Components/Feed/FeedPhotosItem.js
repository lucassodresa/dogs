import React from "react";
import styles from "./FeedPhotosItem.module.css";

const FeedPhotosItem = ({ photo }) => {
  if (!photo) return null;
  const { src, title, acessos: views } = photo;
  return (
    <li className={styles.photo}>
      <img src={src} alt={title} />
      <span className={styles.views}>{views}</span>
    </li>
  );
};

export default FeedPhotosItem;
