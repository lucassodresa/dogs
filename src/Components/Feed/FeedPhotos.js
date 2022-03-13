import React, { useEffect } from "react";
import PropTypes from "prop-types";
import FeedPhotosItem from "./FeedPhotosItem";
import useFetch from "../../Hooks/useFetch";
import { PHOTOS_GET } from "../../Utils/api";
import Error from "../Helper/Error";
import Loading from "../Helper/Loading";
import styles from "./FeedPhotos.module.css";

const FeedPhotos = ({ setInfinite, setModalPhoto, userId, page }) => {
  const { data, loading, error, request } = useFetch();

  useEffect(() => {
    (async () => {
      const total = 6;
      const { url, options } = PHOTOS_GET({
        page,
        total,
        user: userId || 0,
      });
      const { response, json } = await request(url, options);
      if (response?.ok && json?.length < total) setInfinite(false);
      console.log(json);
    })();
  }, [request, userId, page, setInfinite]);

  if (error) return <Error error={error} />;
  if (loading) return <Loading />;
  if (!data) return null;
  return (
    <ul className={`${styles.feed} animationLeft`}>
      {data.map((photo) => (
        <FeedPhotosItem
          key={photo.id}
          photo={photo}
          setModalPhoto={setModalPhoto}
        />
      ))}
    </ul>
  );
};

FeedPhotos.defaultProps = {
  setModalPhoto: () => {},
};

FeedPhotos.propTypes = {
  setModalPhoto: PropTypes.func,
};

export default FeedPhotos;
