import React, {Component} from 'react'
import ReactTable from 'react-table'
import {findElement} from './Util'

  class IngredientList extends Component {
    constructor(props){
      super(props)
      this.state = {
        data: this.props.ingredientData
      }
      this.renderInput = this.renderInput.bind(this);
      this.handleChange = this.handleChange.bind(this);
    }
  
    handleChange(e){
        var data = [...this.state.data]
        findElement(data,'name',e.target.name).cost = e.target.value
        this.setState({data})
        this.props.onIngredientCostChanged(data);
    }
  
    renderInput(cellInfo){
        var name = this.state.data[cellInfo.index].name
        var cost = this.state.data[cellInfo.index][cellInfo.column.id]
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
            data={this.state.data}
            columns={columns}
            defaultPageSize={10}
          />
        </div>
      )
    }
  }

  export default IngredientList