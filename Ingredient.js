import React, {Component} from 'react';

class Ingredient extends Component{
    constructor(props){
        super(props);
        this.state = {
            name: "Ingredient",
            cost: 0
        }
    }

    render(){
        return(
            <div>{this.state.name}: {this.state.cost}</div>
        )
    }
}

export default Ingredient;