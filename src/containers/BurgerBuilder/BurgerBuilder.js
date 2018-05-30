import React, { Component } from "react";
import Aux from "../../hoc/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-order";
import Spinner from "../../components/UI/Spinner/Spinner";

const INGREDIENTS_PRICE = {
  cheese: 0.4,
  bacon: 0.6,
  meat: 1.3,
  salad: 0.5
};
class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false
  };

  setPurchaseHandler = () => {
    this.setState({
      purchasing: true
    });
  };

  purchaseDisontinuedHandler = () => {
    this.setState({
      purchasing: false
    });
  };

  purchaseContinuedHandler = () => {
    // alert("You can continue");
    this.setState({ loading: true });
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
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
        this.setState({ loading: false, purchasing: false });
      })
      .catch(error => {
        this.setState({ loading: false, purchasing: false });
      });
  };

  setPurchasableState = ingredients => {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);

    this.setState({
      purchasable: sum > 0
    });
  };

  addIngredientsHandler = type => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = { ...this.state.ingredients };
    updatedIngredients[type] = updatedCount;
    const priceAdditon = INGREDIENTS_PRICE[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAdditon;
    this.setState({ ingredients: updatedIngredients, totalPrice: newPrice });
    this.setPurchasableState(updatedIngredients);
  };

  removeIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) return;
    const updatedCount = oldCount - 1;
    const updatedIngredients = { ...this.state.ingredients };
    updatedIngredients[type] = updatedCount;
    const priceSubtract = INGREDIENTS_PRICE[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceSubtract;
    this.setState({ ingredients: updatedIngredients, totalPrice: newPrice });
    this.setPurchasableState(updatedIngredients);
  };
  render() {
    let orderSummary = (
      <OrderSummary
        ingredients={this.state.ingredients}
        purchaseContinued={this.purchaseContinuedHandler}
        purchaseDisontinued={this.purchaseDisontinuedHandler}
        totalPrice={this.state.totalPrice}
      />
    );
    const disabledInfo = {
      ...this.state.ingredients
    };
    for (let key in disabledInfo) disabledInfo[key] = disabledInfo[key] <= 0;
    if (this.state.loading) {
      orderSummary = <Spinner />;
    }
    return (
      <Aux>
        <Modal
          orderedStatus={this.state.purchasing}
          modalClicked={this.purchaseDisontinuedHandler}
        >
          {orderSummary}
        </Modal>
        <Burger ingredients={this.state.ingredients} />

        <BuildControls
          addIngredients={this.addIngredientsHandler}
          removeIngredients={this.removeIngredientHandler}
          disabled={disabledInfo}
          price={this.state.totalPrice}
          purchasable={this.state.purchasable}
          ordered={this.setPurchaseHandler}
        />
      </Aux>
    );
  }
}

export default BurgerBuilder;
