import React, {Component} from 'react'
import skillStore from './Stores/SkillStore'
import {findElement, multiplierToPercent, percentToMultiplier} from './Utils/Util'
import Select from 'react-select'

const customStyles = {
    container: (provided, state) =>({
        ...provided,
        'flex-grow':2,
        width:200,
        'padding-right': '10px'
    })
    
}

class SkillList extends Component{
    
    constructor(props){
        super(props)
        this.state = {
            selectedValue:{
                eff:0
            },
            data: []
        }

        this.onDropdownChange = this.onDropdownChange.bind(this)
        this.updateEff = this.updateEff.bind(this)
    }

    static getDerivedStateFromError(error) {
      // Update state so the next render will show the fallback UI.
      return { hasError: true };
    }

    componentDidMount(){
        this.removeListener = skillStore.addListener(() => this.getSkillStoreData())
    }

    getSkillStoreData(){
        this.setState({
            data: skillStore.getSkills()
        })
    }

    componentWillUnmount(){
        this.removeListener()
    }

    onDropdownChange(selectionObject,action){
        if(action.action == 'select-option'){
            selectionObject.eff = multiplierToPercent(findElement(this.state.data,'name',selectionObject.value).multiplier)
            this.setState({...this.state,selectedValue:selectionObject})
        }
    }

    getDropdownData(){
        var result = []
        for(var i =0; i < this.state.data.length; i ++){
            result.push({value: this.state.data[i].name, label: this.state.data[i].name + ' (' + multiplierToPercent(this.state.data[i].multiplier) + '%)'})
        }
        return result
    }

    updateEff(e){
        if(e.target.value > 100 || e.target.value < 0){
            //Trigger the hidden span to show error to user
        }
        else{
            console.log('changing state')
            this.setState({selectedValue:{eff : e.target.value}})
            skillStore.setSkills(this.state.data)
        }
        
    }

    render(){
        if(this.state.hasError){
            return <h1>Someting went wrong.</h1>
        }
        return(
            <div className={this.props.className}>
            <Select 
                options={this.getDropdownData()} 
                styles={customStyles} 
                placeholder="Select a specialty..."
                onChange = {this.onDropdownChange}
            />
            <input type='text' value = {this.state.selectedValue.eff} id='effInput' onChange={this.updateEff} style={{width:'25px', height: '30px'}}></input>%
            <span hidden>Value must be between 0 and 99</span>
            </div>
        )
    }
}

export default SkillList;