import React, { Component } from "react";
import "./BurgerIngredient.css";
import PropTypes from "prop-types";

// to use prop types we converted to class from function
class BurgerIngredient extends Component {
  render() {
    let ingredients = null;
    switch (this.props.type) {
      case "bread-bottom":
        ingredients = <div className="BreadBottom" />;
        break;
      case "bread-top":
        ingredients = (
          <div className="BreadTop">
            <div className="Seeds1"> </div>
            <div className="Seeds2"> </div>
          </div>
        );
        break;
      case "meat":
        ingredients = <div className="Meat" />;
        break;
      case "cheese":
        ingredients = <div className="Cheese" />;
        break;
      case "bacon":
        ingredients = <div className="Bacon" />;
        break;
      case "salad":
        ingredients = <div className="Salad" />;
        break;
      default:
        ingredients = null;
    }
    return ingredients;
  }
}

BurgerIngredient.propTypes = {
  type: PropTypes.string.isRequired
};
export default BurgerIngredient;
