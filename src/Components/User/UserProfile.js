import React from "react";
import { useParams } from "react-router-dom";
import Feed from "../Feed/Feed";
import Head from "../Helper/Head";

const UserProfile = () => {
  const { userId } = useParams();
  return (
    <section className="container mainSection">
      <Head title={userId} description="Dogs Feed" />
      <h1 className="title">{userId}</h1>
      <Feed userId={userId} />
    </section>
  );
};

export default UserProfile;
