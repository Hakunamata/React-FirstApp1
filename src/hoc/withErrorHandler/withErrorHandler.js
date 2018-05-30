import React, { Component } from "react";
import Modal from "../../components/UI/Modal/Modal";
import Aux from "../Aux";
const withErrorHandler = (WrappedComponnet, axios) => {
  return class extends Component {
    state = {
      error: null
    };
    componentWillMount() {
      this.reqInterceptor = axios.interceptors.request.use(req => {
        this.setState({ error: null });
        return req;
      });

      this.resInterceptor = axios.interceptors.response.use(
        response => response,
        error => {
          this.setState({ error: error });
        }
      );
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.resInterceptor);
    }

    closedErrorHandler = () => {
      this.setState({ error: null });
    };

    render() {
      return (
        <Aux>
          <Modal
            orderedStatus={this.state.error}
            modalClosed={this.closedErrorHandler}
          >
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponnet {...this.props} />
        </Aux>
      );
    }
  };
};

export default withErrorHandler;
