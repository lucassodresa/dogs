import styles from "./Footer.module.css";
import { ReactComponent as DogsIcon } from "../Assets/dogs-footer.svg";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <DogsIcon />
      <p>Dogs. Copyright © {new Date().getFullYear()}</p>
    </footer>
  );
};

export default Footer;
