import React, { Component } from 'react';
import ReactTable, { ReactTableDefaults } from 'react-table';
import 'react-table/react-table.css'
import './App.css';
import IngredientStore from './Stores/IngredientStore';
import RecipeList from './RecipeList'
import IngredientList from './IngredientList'



const ingredientData = [
  { name: 'ingredient 1', cost: 3 },
  { name: 'ingredient 2', cost: 0 },
  { name: 'ingredient 3', cost: 7 },
  { name: 'ingredient 4', cost: 1 }
]

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      ingredientData: ingredientData
    }
    this.recalculateCosts = this.recalculateCosts.bind(this);
  }

  recalculateCosts(newIngredientData){
    var newState = this.state;
    newState.ingredientData = newIngredientData
    this.setState(newState);
  }

  render() {
    var ingredients = IngredientStore.getIngredients();
    console.log(ingredients.length);
    var ingredientsRender = [];
    for (var i = 0; i < ingredients.length; i++) {
      ingredientsRender.push(<Ingredient value={ingredients[i]} />);
    }
    return (
      <div className="App">
        <h1>Eco-nomy Calculator</h1>
        <hr/>
        <br/>
        <div className='table-display'>
          <IngredientList 
            className='ingredient-list' 
            onIngredientCostChanged={this.recalculateCosts}
            ingredientData = {this.state.ingredientData}/>
          <div className='resize-box'></div>
          <RecipeList  
            className='recipe-list'
            ingredientData = {this.state.ingredientData}/>
        </div>
      </div>
    );
  }
}





class Ingredient extends Component {
  constructor(props) {
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
