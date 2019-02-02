import React, {Component} from 'react'
import ReactTable from 'react-table'
import {findElement} from './Util'
import recipeStore from './Stores/RecipeStore'
import ingredientStore from './Stores/IngredientStore'
import skillStore from './Stores/SkillStore'

class RecipeList extends Component {

    //Get the recipe cost by earching the ingredients
    //list for cost and multiplying that cost by 
    //the recipe's base amount.
    //*NOTE* This should be done on the DB end
    getRecipeCost(recipe) {
      var total = 0.0
      
      //iterate over all ingredients
      for(var i = 0; i < recipe.ingredients.length;i++){
        var ingredient = recipe.ingredients[i];
        var ingredientInfo = findElement(ingredientStore.getIngredients(),'name',ingredient.name);
        var skillInfo = findElement(skillStore.getSkills(),'name',recipe.skill);

        total += (ingredientInfo === null || ingredientInfo === undefined ? 0 : ingredientInfo.cost) * ingredient.baseAmount * ((skillInfo) ? skillInfo.multiplier : 1);
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
              Header: "Speciality(Eff)",
              id: 'skill',
              accessor: (recipe) => {
                const skills = skillStore.getSkills()
                var skillMultiplier = findElement(skillStore.getSkills(),'name',recipe.skill)
                return recipe.skill + '(' + ((1-(skillMultiplier === null || skillMultiplier === undefined?0:skillMultiplier.multiplier)) * 100) + '%)'
              }
            },
            {
              Header: "Cost",
              id: 'ingredients',
              accessor: (d) => this.getRecipeCost(d)
            }]
        }
      ]
  
      return (
        <div className = {this.props.className}>
          <ReactTable
            data={recipeStore.getRecipes()}
            columns={columns}
            defaultPageSize={10}
          />
        </div>
      )
    }
  }

  export default RecipeList