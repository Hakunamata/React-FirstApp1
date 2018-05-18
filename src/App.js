import React, { Component } from "react";
// import "./App.css";
import UserInput from "./UserInput/UserInput";
import UserOutput from "./UserOutput/UserOutput";

class App extends Component {
  state = {
    name: "Shanky"
  };

  userNameChangeHandler = event => {
    this.setState({ name: event.target.value });
  };

  render() {
    return (
      <div className="App">
        <UserInput
          change={this.userNameChangeHandler}
          currentUsername={this.state.name}
        />
        <UserOutput name={this.state.name} />
        <UserOutput />
      </div>
    );
  }
}

export default App;
