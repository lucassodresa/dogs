import React, { useState } from "react";
import FeedModal from "./FeedModal";
import FeedPhotos from "./FeedPhotos";

const Feed = () => {
  const [modaPhoto, setModalPhoto] = useState(null);
  return (
    <div>
      {modaPhoto && (
        <FeedModal photo={modaPhoto} setModalPhoto={setModalPhoto} />
      )}
      <FeedPhotos setModalPhoto={setModalPhoto} />
    </div>
  );
};

export default Feed;
