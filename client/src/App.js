import React, { Component } from 'react';
import ReactTable, { ReactTableDefaults } from 'react-table';
import 'react-table/react-table.css'
import './App.css';
import IngredientStore from './Stores/IngredientStore';

const ingredientData = [
  { name: 'ingredient 1', cost: 3 },
  { name: 'ingredient 2', cost: 0 },
  { name: 'ingredient 3', cost: 7 },
  { name: 'ingredient 4', cost: 1 }
]

const skillEfficiencyMultiplier = [
  { name: 'skill 1', multiplier: .2 },
  { name: 'skill 2', multiplier: 1 },
  { name: 'skill 3', multiplier: .8 }
]

const recipeData = [
  {
    name: 'recipe 1 (80% Efficiency)',
    skill: 'skill 1',
    ingredients: [
      { name: 'ingredient 1', baseAmount: '20' },
      { name: 'ingredient 4', baseAmount: '2' }
    ]
  },
  {
    name: 'recipe 2 (0 Effeciency)',
    skill: 'skill 2',
    ingredients: [
      { name: 'ingredient 3', baseAmount: '200' },
      { name: 'ingredient 1', baseAmount: '8' }
    ]
  },
  {
    name: 'recipe 3 (20% Effeciency)',
    skill: 'skill 3',
    ingredients: [
      { name: 'ingredient 2', baseAmount: '1' },
      { name: 'ingredient 3', baseAmount: '12' }
    ]
  },
]


class App extends Component {
  render() {
    var ingredients = IngredientStore.getIngredients();
    console.log(ingredients.length);
    var ingredientsRender = [];
    for (var i = 0; i < ingredients.length; i++) {
      ingredientsRender.push(<Ingredient value={ingredients[i]} />);
    }
    return (
      <div className="App">
        <IngredientList />
        <RecipeList />
      </div>
    );
  }
}

class RecipeList extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const columns = [
      {
        Header: "Recipes",
        columns: [
          {
            Header: "Name",
            accessor: "name"
          },
          {
            Header: "Cost",
            id: 'ingredients',
            accessor: (d) => getRecipeCost(d)
          }]
      }
    ]

    return (
      <div>
        <ReactTable
          data={recipeData}
          columns={columns}
          defaultPageSize={10}
        />
      </div>
    )
  }

}

class IngredientList extends Component {
  render(props) {
    return (
      <div></div>
    )
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

//Get the recipe cost by earching the ingredients
//list for cost and multiplying that cost by 
//the recipe's base amount.
//*NOTE* This should be done on the DB end
function getRecipeCost(recipe) {
  const total = 0

  for (var x in ingredientData) {
    if (ingredientData[x].name === recipe.ingredient.name) {
      for (var y in skillEfficiencyMultiplier) {
        if(y.name === recipe.skill)
        return total + (ingredientData[x].cost * recipe.ingredient.baseAmount * y.multiplier);
      }
    }
  }
  return total;
}

export default App;
