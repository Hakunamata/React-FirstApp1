import React, { Component } from "react";
import Aux from "../../hoc/Aux/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-order";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

const INGREDIENTS_PRICE = {
  cheese: 0.4,
  bacon: 0.6,
  meat: 1.3,
  salad: 0.5
};
class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false
  };

  componentDidMount() {
    axios
      .get(
        "https://react-my-burger-12a8f.firebaseio.com/orders/ingredients.json"
      )
      .then(response => {
        this.setState({ ingredients: response.data });
      })
      .catch(error => {
        this.setState({ error: true });
      });
  }

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
    // this.setState({ loading: true });
    // const order = {
    //   ingredients: this.state.ingredients,
    //   price: this.state.totalPrice,
    //   customer: {
    //     name: "Shashank Agrawal",
    //     address: {
    //       street: "TEST Street 1",
    //       zipcode: "560059",
    //       country: "India"
    //     },
    //     email: "test@test.com"
    //   },
    //   deliveryMethod: "Fastest"
    // };
    // axios
    //   .post("/orders.json", order)
    //   .then(response => {
    //     this.setState({ loading: false, purchasing: false });
    //   })
    //   .catch(error => {
    //     this.setState({ loading: false, purchasing: false });
    //   });

    const queryParams = [];
    for (let i in this.state.ingredients)
      queryParams.push(
        encodeURIComponent(i) +
          "=" +
          encodeURIComponent(this.state.ingredients[i])
      );
    const queryString = queryParams.join("&");
    console.log("queryParams" + queryParams);
    console.log("queryString" + queryString);

    this.props.history.push({
      pathname: "/checkout",
      search: queryString
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
    let orderSummary = null;
    const disabledInfo = {
      ...this.state.ingredients
    };
    for (let key in disabledInfo) disabledInfo[key] = disabledInfo[key] <= 0;

    let burger = this.state.error ? (
      <p> Can not load the ingredients </p>
    ) : (
      <Spinner />
    );
    if (this.state.ingredients) {
      burger = (
        <Aux>
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
      orderSummary = (
        <OrderSummary
          ingredients={this.state.ingredients}
          purchaseContinued={this.purchaseContinuedHandler}
          purchaseDisontinued={this.purchaseDisontinuedHandler}
          totalPrice={this.state.totalPrice}
        />
      );
    }
    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    return (
      <Aux>
        <Modal
          orderedStatus={this.state.purchasing}
          modalClosed={this.purchaseDisontinuedHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);
