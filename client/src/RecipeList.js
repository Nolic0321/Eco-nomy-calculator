import React, { Component } from 'react'
import ReactTable from 'react-table'
import recipeStore from './Stores/RecipeStore'
import ingredientStore from './Stores/IngredientStore'
import skillStore from './Stores/SkillStore'

class RecipeList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      data: [],
      ingredients: [],
      skills: []
    }

    this.getRecipeCost = this.getRecipeCost.bind(this)
    this.getSpecialityEffeciency = this.getSpecialityEffeciency.bind(this)
  }



  componentDidMount() {
    this.removeListener = skillStore.addListener((state) => {
      this.setState({
        skills: state.data
      })
    })

    this.removeListener = ingredientStore.addListener(data => {
      this.setState({
        ingredients: data.data
      })
    })

    this.removeListener = recipeStore.addListener(data => {
      this.setState({
        data: data.data
      })
    })
  }

  componentWillUnmount() {
    this.removeListener()
  }
  //Get the recipe cost by earching the ingredients
  //list for cost and multiplying that cost by 
  //the recipe's base amount.
  //*NOTE* This should be done on the DB end
  getRecipeCost(recipe) {
    var total = 0.0

    //iterate over all ingredients
    recipe.ingredients.forEach(ingredient => {
      var ingredientInfo = this.state.ingredients.find(ing => ing.id === ingredient.id) //findElement(ingredientStore.getIngredients(), 'name', ingredient.name);
      var skillInfo = this.state.skills.find(k => k.id === recipe.skill.id) //findElement(skillStore.getSkills(), 'name', recipe.skill);

      total += (ingredientInfo === null || ingredientInfo === undefined ? 0 : ingredientInfo.cost) * ingredient.baseAmount * ((skillInfo) ? skillInfo.multiplier : 1);

    });
    return total;
  }

  getSpecialityEffeciency(recipe) {
    const skills = this.state.skills
    if (skills.length === 0)
      return ''
    else {
      const skill = skills.find(skill => skill.id == recipe.skill.id)
      const skillMultiplier = skill.multiplier
      return skill.name + '(' + ((100 - (skillMultiplier === null || skillMultiplier === undefined ? 0 : skillMultiplier * 100))) + '%)'
    }

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
            accessor: (recipe) => this.getSpecialityEffeciency(recipe)
          },
          {
            Header: "Cost",
            id: 'ingredients',
            accessor: (d) => this.getRecipeCost(d)
          }]
      }
    ]

    return (
      <div className={this.props.className}>
        <ReactTable
          data={this.state.data}
          columns={columns}
          defaultPageSize={10}
        />
      </div>
    )
  }
}

export default RecipeList