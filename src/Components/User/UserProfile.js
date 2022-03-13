import React from "react";
import { useParams } from "react-router-dom";
import Feed from "../Feed/Feed";

const UserProfile = () => {
  const { userId } = useParams();
  return (
    <section className="container mainSection">
      <h1 className="title">{userId}</h1>
      <Feed userId={userId} />
    </section>
  );
};

export default UserProfile;
