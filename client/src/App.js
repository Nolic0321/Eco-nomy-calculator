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
    this.listeners = [];
    this.recalculateCosts = this.recalculateCosts.bind(this);
  }

  componentDidMount() {
    // We store a reference to the added event listener.
    this.listeners.push(ingredientStore.addListener((state) => {
      this.setState({
        ingredientData: state.data
      });
    }));

    this.listeners.push(recipeStore.addListener((state) => {
      this.setState({
        recipeData: state.data
      });
    }));

    this.listeners.push(skillStore.addListener((state) => {
      this.setState({
        skillData: state.data
      });
    }))
  }

  componentWillUnmount () {
    // Destroy the listener when the component unmounts.
    for(var listener in this.listeners){
      this.listeners[listener]()
    }
  }

  updateStateData(dataName,newData){
    var newState = this.state;
    newState[dataName] = newData;
    this.setState(newState);
  }

  recalculateCosts(newIngredientData){
    ingredientStore.setState({data:newIngredientData});
  }

  render() {
    console.log('rendering...')
    return (
      <div className="App">
        <h1>Eco-nomy Calculator</h1>
        <hr/>
        <div className='table-display'>
        <SkillList className = 'inline-flex'/>
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
