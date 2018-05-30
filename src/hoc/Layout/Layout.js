import React from "react";
import Aux from "../../hoc/Aux";
import "./Layout.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
const layout = props => (
  <Aux>
    <Toolbar />
    <SideDrawer />
    <div>Toolbar, Sidebar, BackDrop </div>
    <main className="Content"> {props.children} </main>
  </Aux>
);

export default layout;
