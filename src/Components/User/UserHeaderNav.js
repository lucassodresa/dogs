import React, { useContext, useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { UserContext } from "../../Contexts/UserContext";
import { ReactComponent as MyPhotos } from "../../Assets/feed.svg";
import { ReactComponent as Statistics } from "../../Assets/statistics.svg";
import { ReactComponent as AddPhoto } from "../../Assets/add.svg";
import { ReactComponent as Logout } from "../../Assets/logout.svg";
import styles from "./UserHeaderNav.module.css";
import useMedia from "../../Hooks/useMedia";

const UserHeaderNav = () => {
  const { userLogout } = useContext(UserContext);
  const isMobile = useMedia("(max-width: 40rem)");
  const [isMobileMenuActive, setIsMobileMenuActive] = useState();

  const { pathname } = useLocation();

  useEffect(() => {
    setIsMobileMenuActive(false);
  }, [pathname]);

  return (
    <>
      {isMobile && (
        <button
          aria-label="Menu"
          className={`${styles.mobileButton} ${
            isMobileMenuActive && styles.mobileButtonActive
          }`}
          onClick={() => setIsMobileMenuActive((prevState) => !prevState)}
        ></button>
      )}

      <nav
        className={`${isMobile ? styles.navMobile : styles.nav} ${
          isMobileMenuActive && styles.navMobileActive
        }`}
      >
        <NavLink to="/account" end>
          <MyPhotos />
          {isMobile && "My photos"}
        </NavLink>
        <NavLink to="/account/statistics">
          <Statistics />
          {isMobile && "Statistics"}
        </NavLink>
        <NavLink to="/account/post">
          <AddPhoto />
          {isMobile && "Add photo"}
        </NavLink>
        <button onClick={userLogout}>
          <Logout />
          {isMobile && "Logout"}
        </button>
      </nav>
    </>
  );
};

export default UserHeaderNav;
