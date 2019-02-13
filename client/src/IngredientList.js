import React, {Component} from 'react'
import ReactTable from 'react-table'
import {findElement} from './Utils/Util'
import ingredientStore from './Stores/IngredientStore';

  class IngredientList extends Component {
    constructor(props){
      super(props);
      this.renderInput = this.renderInput.bind(this);
      this.handleChange = this.handleChange.bind(this);
    }
  
    handleChange(e){
        var data = ingredientStore.getIngredients()
        data.find(result => result.name === e.target.name).cost = e.target.value;
        ingredientStore.setState(data)
        // this.props.onIngredientCostChanged(data);
    }
  
    renderInput(cellInfo){
        var name = ingredientStore.getIngredients()[cellInfo.index].name
        var cost = ingredientStore.getIngredients()[cellInfo.index].cost
      return(
          <form>
          <input type='text' value={cost} name={name} contentEditable onChange={this.handleChange}></input>
        </form>
      )
    }

    render() {
      const columns = [
        {
          Header: "Ingredients",
          columns: [
            {
              Header: "Name",
              accessor: "name"
            },
            {
              Header: "Cost",
              accessor: 'cost',
              Cell: this.renderInput
            }]
        }
      ]
  
      return (
        <div className = {this.props.className}>
          <ReactTable
            data={ingredientStore.getIngredients()}
            columns={columns}
            defaultPageSize={10}
          />
        </div>
      )
    }
  }

  export default IngredientList