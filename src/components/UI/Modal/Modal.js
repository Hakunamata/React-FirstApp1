import React, { Component } from "react";
import "./Modal.css";
import Aux from "../../../hoc/Aux/Aux";
import Backdrop from "../Backdrop/Backdrop";

class Modal extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.orderedStatus !== this.props.orderedStatus;
  }
  componentWillUpdate() {
    console.log("will update");
  }

  render() {
    return (
      <Aux>
        <Backdrop
          show={this.props.orderedStatus}
          clicked={this.props.modalClicked}
        />
        <div
          className="Modal"
          style={{
            transform: this.props.orderedStatus
              ? "translateY(0)"
              : "translateY(-100vh)",
            opacity: this.props.orderedStatus ? "1" : "0"
          }}
        >
          {this.props.children}
        </div>
      </Aux>
    );
  }
}

export default Modal;
