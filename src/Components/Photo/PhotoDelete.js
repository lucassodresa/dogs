import React, { useCallback } from "react";
import useFetch from "../../Hooks/useFetch";
import { PHOTO_DELETE } from "../../Utils/api";
import styles from "./PhotoDelete.module.css";

const PhotoDelete = ({ id }) => {
  const { loading, request } = useFetch();

  const handleClick = useCallback(async () => {
    const confirm = window.confirm("Are you sure you want to delete?");
    if (!confirm) return;

    const token = window.localStorage.getItem("token");
    const { url, options } = PHOTO_DELETE(id, token);
    const { response } = await request(url, options);
    if (response.ok) window.location.reload();
  }, [id, request]);

  return (
    <>
      {loading ? (
        <button disabled className={styles.delete}>
          Deleting...
        </button>
      ) : (
        <button onClick={handleClick} className={styles.delete}>
          Delete
        </button>
      )}
    </>
  );
};

export default PhotoDelete;
