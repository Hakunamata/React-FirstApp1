import React, { Component } from "react";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Button from "../../../components/UI/Button/Button";
import axios from "../../../axios-order";

class ContactData extends Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      postalCode: ""
    },
    loading: false
  };

  orderHandler = event => {
    event.preventDefault();
    // console.log(this.props.ingredients);
    // console.log(this.props.price);

    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: "Shashank Agrawal",
        address: {
          street: "TEST Street 1",
          zipcode: "560059",
          country: "India"
        },
        email: "test@test.com"
      },
      deliveryMethod: "Fastest"
    };
    axios
      .post("/orders.json", order)
      .then(response => {
        this.setState({ loading: false });
        this.props.history.push("/");
      })
      .catch(error => {
        this.setState({ loading: false });
      });
  };

  render() {
    let form = (
      <form>
        <input
          className="Input"
          type="text"
          name="name"
          placeholder="Your Name"
        />
        <input
          className="Input"
          type="email"
          name="email"
          placeholder="Your Email"
        />
        <input
          className="Input"
          type="text"
          name="street"
          placeholder="Street"
        />
        <input
          className="Input"
          type="text"
          name="postal"
          placeholder="Postal"
        />
        <Button btnType="Success" clicked={this.orderHandler}>
          ORDER
        </Button>
      </form>
    );
    if (this.state.loading) form = <Spinner />;
    return (
      <div className="ContactData">
        <h4>Enter your contact details</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;
