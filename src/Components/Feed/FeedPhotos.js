import React, { useEffect } from "react";
import FeedPhotosItem from "./FeedPhotosItem";
import useFetch from "../../Hooks/useFetch";
import { PHOTOS_GET } from "../../Utils/api";
import Error from "../Helper/Error";
import Loading from "../Helper/Loading";
import styles from "./FeedPhotos.module.css";

const FeedPhotos = () => {
  const { data, loading, error, request } = useFetch();

  useEffect(() => {
    (async () => {
      const { url, options } = PHOTOS_GET({ page: 1, total: 6, user: 0 });
      const { json } = await request(url, options);
      console.log(json);
    })();
  }, [request]);

  if (error) return <Error error={error} />;
  if (loading) return <Loading />;
  if (!data) return null;
  return (
    <ul className={`${styles.feed} animationLeft`}>
      {data.map((photo) => (
        <FeedPhotosItem key={photo.id} photo={photo} />
      ))}
    </ul>
  );
};

export default FeedPhotos;
