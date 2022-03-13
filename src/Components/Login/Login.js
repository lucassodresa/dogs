import React, { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { UserContext } from "../../Contexts/UserContext";
import LoginCreate from "./LoginCreate";
import LoginForm from "./LoginForm";
import LoginLostPassword from "./LoginLostPassword";
import LoginPasswordReset from "./LoginPasswordReset";
import styles from "./Login.module.css";
import NotFound from "../NotFound";

const Login = () => {
  const { isLoggedIn } = useContext(UserContext);

  if (isLoggedIn) return <Navigate to="/account" />;
  return (
    <section className={styles.login}>
      <div className={styles.forms}>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="create" element={<LoginCreate />} />
          <Route path="lost" element={<LoginLostPassword />} />
          <Route path="reset" element={<LoginPasswordReset />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </section>
  );
};

export default Login;
