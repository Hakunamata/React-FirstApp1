import React from "react";
import "./Modal.css";
import Aux from "../../../hoc/Aux";
import Backdrop from "../Backdrop/Backdrop";

const modal = props => (
  <Aux>
    <Backdrop show={props.orderedStatus} clicked={props.modalClicked} />
    <div
      className="Modal"
      style={{
        transform: props.orderedStatus ? "translateY(0)" : "translateY(-100vh)",
        opacity: props.orderedStatus ? "1" : "0"
      }}
    >
      {props.children}
    </div>
  </Aux>
);

export default modal;