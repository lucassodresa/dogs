import React from "react";
import styles from "./Button.module.css";
import PropTypes from "prop-types";
const Button = ({ children, disabled }) => {
  return (
    <button disabled={disabled} className={styles.button}>
      {children}
    </button>
  );
};

Button.defaultProps = {
  disabled: false,
};

Button.propTypes = {
  disabled: PropTypes.bool,
};

export default Button;
