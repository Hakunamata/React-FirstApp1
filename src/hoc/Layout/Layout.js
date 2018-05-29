import React, { Component } from "react";
import Aux from "../Aux/Aux";
import "./Layout.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

class Layout extends Component {
  state = {
    showSideDrawer: false
  };
  sideDrawerClosedHandler = props => this.setState({ showSideDrawer: false });

  sideDrawerToggleHandler = props =>
    this.setState(prevState => {
      return {
        showSideDrawer: !prevState.showSideDrawer
      };
    });
  render() {
    return (
      <Aux>
        <Toolbar drawerTogglClicked={this.sideDrawerToggleHandler} />
        <SideDrawer
          open={this.state.showSideDrawer}
          closed={this.sideDrawerClosedHandler}
        />
        <main className="Content"> {this.props.children} </main>
      </Aux>
    );
  }
}

export default Layout;
