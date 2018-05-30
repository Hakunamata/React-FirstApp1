import React, { Component } from "react";
import "./Modal.css";
import Aux from "../../../hoc/Aux";
import Backdrop from "../Backdrop/Backdrop";

class modal extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.shown !== this.props.show ||
      nextProps.children != this.props.children
    );
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

export default modal;
