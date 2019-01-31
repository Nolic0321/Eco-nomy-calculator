import React, {Component} from 'react'
import ReactTable from 'react-table'
import {findElement} from './Util'



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

class RecipeList extends Component {
    constructor(props){
        super(props)
        this.state = {
            ingredientData: this.props.ingredientData
        }
    }
    //Get the recipe cost by earching the ingredients
    //list for cost and multiplying that cost by 
    //the recipe's base amount.
    //*NOTE* This should be done on the DB end
    getRecipeCost(recipe) {
      var total = 0.0
      
      //iterate over all ingredients
      for(var i = 0; i < recipe.ingredients.length;i++){
        var ingredient = recipe.ingredients[i];
        var ingredientInfo = findElement(this.state.ingredientData,'name',ingredient.name);
        var skillInfo = findElement(skillEfficiencyMultiplier,'name',recipe.skill);
  
        total += ingredientInfo.cost * ingredient.baseAmount * ((skillInfo)?skillInfo.multiplier:1);
      }
      return total;
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
              accessor: (d) => this.getRecipeCost(d,d.skill)
            }]
        }
      ]
  
      return (
        <div className = {this.props.className}>
          <ReactTable
            data={recipeData}
            columns={columns}
            defaultPageSize={10}
          />
        </div>
      )
    }
  }

  export default RecipeList