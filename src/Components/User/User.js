import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { UserContext } from "../../Contexts/UserContext";
import Feed from "../Feed/Feed";
import Head from "../Helper/Head";
import NotFound from "../NotFound";
import UserHeader from "./UserHeader";
import UserPhotoPost from "./UserPhotoPost";
import UserStats from "./UserStats";

const User = () => {
  const { data } = useContext(UserContext);
  return (
    <section className="container">
      <Head title="My Account" />
      <UserHeader />
      <Routes>
        <Route path="/" element={<Feed userId={data.id} />} />
        <Route path="/post" element={<UserPhotoPost />} />
        <Route path="/statistics" element={<UserStats />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </section>
  );
};

export default User;
