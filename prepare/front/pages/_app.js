import React from 'react';
import "antd/dist/antd.css"
import PropTypes from "prop-types";

// 모든 페이지공통
const NodeBird = ({ Component}) => {
  return (
    <><Component /></>
  );
};

NodeBird.propTypes = {
  Component: PropTypes.elementType.isRequired,
}

export default NodeBird;
