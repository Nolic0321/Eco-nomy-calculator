import React, { Component } from 'react';
import ReactTable from 'react-table';
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
        <IngredientList/>
      </div>
    );
  }
}

class IngredientList extends Component{
  render(props){
    return(
      <Ingredient/>
    )
  }
}

class Ingredient extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: 'ingredient',
      cost: 50
    }
  }
  render(props) {
    return (
      <div>
        <span>Ingredient: {this.state.name}</span>
        <span>Count: {this.state.cost}</span>
      </div>
    );
  }
}

export default App;
