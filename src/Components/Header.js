import { useContext } from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import { ReactComponent as Dogs } from "../Assets/dogs.svg";
import { UserContext } from "../Contexts/UserContext";
const Header = () => {
  const { data, userLogout } = useContext(UserContext);

  return (
    <header className={styles.header}>
      <nav className={`container ${styles.nav}`}>
        <Link className={styles.logo} to="/" aria-label="Dogs - Home">
          <Dogs />
        </Link>
        {data?.email ? (
          <Link className={styles.login} to="/account">
            {data.nome}
            <button onClick={userLogout}>Logout</button>
          </Link>
        ) : (
          <Link className={styles.login} to="/login">
            Login / Register
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
