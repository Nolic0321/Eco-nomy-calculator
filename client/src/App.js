import React, { Component } from 'react';
import 'react-table/react-table.css'
import './App.css';
import ingredientStore from './Stores/IngredientStore';
import recipeStore from './Stores/RecipeStore'
import RecipeList from './RecipeList'
import IngredientList from './IngredientList'

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      ingredientData: []
    }
    this.recalculateCosts = this.recalculateCosts.bind(this);
    this.updateIngredientData = this.updateIngredientData.bind(this);
  }
  componentDidMount () {
    // We store a reference to the added event listener.
    this.removeListener = ingredientStore.addListener((state) => {
      this.updateIngredientData(state.data)
    });
    this.removeListener = recipeStore.addListener((state) =>{
      this.setState(state);
    })
    this.setState(ingredientStore.getState());
  }
  componentWillUnmount () {
    // Destroy the listener when the component unmounts.
    this.removeListener();
  }

  updateIngredientData(newIngredientData){
    var newState = this.state;
    newState.ingredientData = newIngredientData;
    this.setState(newState);
  }

  recalculateCosts(newIngredientData){
    ingredientStore.setIngredients(newIngredientData);
  }

  render() {
    console.log('rendering...')
    return (
      <div className="App">
        <h1>Eco-nomy Calculator</h1>
        <hr/>
        <br/>
        <div className='table-display'>
          <IngredientList 
            className='ingredient-list' 
            onIngredientCostChanged={this.recalculateCosts}/>
          <RecipeList  
            className='recipe-list'/>
        </div>
      </div>
    );
  }
}

export default App;
