import React, { Component } from 'react';
import 'react-table/react-table.css'
import './App.css';
import ingredientStore from './Stores/IngredientStore';
import recipeStore from './Stores/RecipeStore'
import RecipeList from './RecipeList'
import IngredientList from './IngredientList'
import SkillList from './SkillsList'
import skillStore from './Stores/SkillStore';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      ingredientData: [],
      recipeData: [],
      skillData: []
    }
    this.recalculateCosts = this.recalculateCosts.bind(this);
    this.updateIngredientData = this.updateStateData.bind(this);
  }
  componentDidMount () {
    // We store a reference to the added event listener.
    this.removeListener = ingredientStore.addListener(() => {
      this.updateStateData('ingredientData',ingredientStore.getIngredients())
    });
    this.removeListener = recipeStore.addListener(() =>{
      this.updateStateData('recipeData',recipeStore.getRecipes());
    })
    this.removeListener = skillStore.addListener(() =>{
      this.updateStateData('skillData',skillStore.getSkills());
    })
    this.setState(ingredientStore.getState());
  }
  componentWillUnmount () {
    // Destroy the listener when the component unmounts.
    this.removeListener();
  }

  updateStateData(dataName,newData){
    var newState = this.state;
    newState[dataName] = newData;
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
        <div className='table-display'>
        <SkillList className='flex-grow-left'/>
        </div>
        
        <br/>
        <div className='table-display'>
          <IngredientList 
            className='flex-grow-left' 
            onIngredientCostChanged={this.recalculateCosts}/>
          <RecipeList  
            className='flex-grow-right'/>
        </div>
      </div>
    );
  }
}

export default App;
