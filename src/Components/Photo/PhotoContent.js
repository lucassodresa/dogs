import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { UserContext } from "../../Contexts/UserContext";
import Image from "../Helper/Image";
import PhotoComments from "./PhotoComments";
import styles from "./PhotoContent.module.css";
import PhotoDelete from "./PhotoDelete";

const PhotoContent = ({ data, isSingle }) => {
  const user = useContext(UserContext);
  if (!data) return null;

  const { photo, comments } = data;

  return (
    <div className={`${styles.photo} ${isSingle ? styles.single : ""}`}>
      <div className={styles.img}>
        <Image src={photo.src} alt={photo.title} />
      </div>
      <div className={styles.details}>
        <div>
          <p className={styles.author}>
            {user?.data?.username === photo.author ? (
              <PhotoDelete id={photo.id} />
            ) : (
              <Link to={`/profile/${photo.author}`}>@{photo.author}</Link>
            )}

            <span className={styles.views}>{photo.acessos}</span>
          </p>
          <h1 className="title">
            <Link to={`/photo/${photo.id}`}>{photo.title}</Link>
          </h1>
          <ul className={styles.attributes}>
            <li>{photo.peso} Kg</li>
            <li>{photo.idade} years</li>
          </ul>
        </div>
      </div>
      <PhotoComments id={photo.id} comments={comments} isSingle={isSingle} />
    </div>
  );
};

PhotoContent.defaultProps = {};

PhotoContent.propTypes = {
  data: PropTypes.object,
  isSingle: PropTypes.bool,
};

export default PhotoContent;
