import React, { Component } from 'react';
import 'react-table/react-table.css'
import './App.css';
import IngredientStore from './Stores/IngredientStore';
import RecipeList from './RecipeList'
import IngredientList from './IngredientList'

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      ingredientData: IngredientStore.getIngredients()
    }
    this.recalculateCosts = this.recalculateCosts.bind(this);
  }

  recalculateCosts(newIngredientData){
    var newState = this.state;
    newState.ingredientData = newIngredientData
    this.setState(newState);
  }

  render() {
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
