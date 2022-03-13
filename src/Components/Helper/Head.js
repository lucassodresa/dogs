import React, { useEffect } from "react";
import Proptypes from "prop-types";

const Head = ({ title, description }) => {
  useEffect(() => {
    document.title = `${title} | Dogs`;
    document
      .querySelector("meta[name='description']")
      .setAttribute("content", description || "");
  }, [title, description]);

  return <></>;
};

Head.defaultProps = {
  description: "",
};

Head.protoTypes = {
  title: Proptypes.string,
  description: Proptypes.string,
};

export default Head;
