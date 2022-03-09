import React from "react";
import styles from "./Input.module.css";
import PropTypes from "prop-types";

const Input = ({
  label,
  type,
  name,
  value,
  error,
  onChange,
  onBlur,
  className,
}) => {
  return (
    <div className={`${styles.wrapper} ${className}`}>
      <label htmlFor={name} className={styles.label}>
        {label}
      </label>

      {type === "textarea" ? (
        <textarea
          id={name}
          name={name}
          className={styles.input}
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
        />
      ) : (
        <input
          id={name}
          name={name}
          className={styles.input}
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
        />
      )}

      <p className={styles.error}>{error}</p>
    </div>
  );
};

Input.defaultProps = {
  type: "text",
};

Input.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
};

export default Input;
