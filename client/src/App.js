import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import IngredientStore from './Stores/IngredientStore';


class App extends Component {
  render() {
    var ingredients = IngredientStore.getIngredients();
    console.log(ingredients.length);
    var ingredientsRender = [];
    for(var i=0; i < ingredients.length;i++){
      ingredientsRender.push(<Ingredient value={ingredients[i]}/>);
    }
    return (
      <div className="App">
      <div>{ingredients}</div>
        {ingredientsRender}
      </div>
    );
  }
}

class Ingredient extends Component {
  render(props) {
    return (
      <div>
        <span>Ingredient: {props.name}</span>
        <span>Count: {props.count}</span>
      </div>
    );
  }
}

export default App;
