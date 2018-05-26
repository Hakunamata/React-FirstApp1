import React from "react";
import "./Modal.css";

const modal = props => (
  <div
    className="Modal"
    style={{
      transform: props.orderedStatus ? "translateY(0)" : "translateY(-100vh)",
      opacity: props.orderedStatus ? "1" : "0"
    }}
  >
    {props.children}
  </div>
);

export default modal;
