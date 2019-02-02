import React, {Component} from 'react'
import skillStore from './Stores/SkillStore'

class SkillList extends Component{
    render(){
        return(
            <div className={this.props.className}>
            <form>
            <span>Skill Effeciency </span>
            <span><input type='text' value='0' style={{width:'auto'}}></input></span>
            </form>
            </div>
        )
    }
}

export default SkillList;