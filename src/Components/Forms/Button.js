import React from "react";
import styles from "./Button.module.css";
import PropTypes from "prop-types";
const Button = ({ children, disabled, loading }) => {
  return loading ? (
    <button disabled={loading} className={styles.button}>
      Loading...
    </button>
  ) : (
    <button disabled={disabled} className={styles.button}>
      {children}
    </button>
  );
};

Button.defaultProps = {
  disabled: false,
  loading: false,
};

Button.propTypes = {
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
};

export default Button;
