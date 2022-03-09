import React, { useCallback, useState } from "react";
import styles from "./Image.module.css";

const Image = ({ alt, ...props }) => {
  const [isShowingSkeleton, setIsShowingSkeleton] = useState(true);
  const handleLoad = useCallback(({ target }) => {
    setIsShowingSkeleton(false);
    target.style.opacity = 1;
  }, []);

  return (
    <div className={styles.wrapper}>
      {isShowingSkeleton && <div className={styles.skeleton}></div>}
      <img onLoad={handleLoad} className={styles.img} alt={alt} {...props} />
    </div>
  );
};

export default Image;
