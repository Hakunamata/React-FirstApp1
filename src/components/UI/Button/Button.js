import React from "react";
import "./Button.css";
const button = props => {
  const btnClass = ["Button", props.btnType].join(" ");
  return (
    <button
      disabled={props.disabled}
      className={btnClass}
      onClick={props.clicked}
    >
      {props.children}
    </button>
  );
};

export default button;
