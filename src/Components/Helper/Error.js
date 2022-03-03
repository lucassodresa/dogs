import React from "react";
import PropTypes from "prop-types";

const Error = ({ error }) => {
  return error ? (
    <p style={{ color: "#f31", margin: "1rem 0" }}>{error}</p>
  ) : null;
};

Error.defaultProps = {
  error: null,
};

Error.propTypes = {
  error: PropTypes.string,
};
export default Error;
