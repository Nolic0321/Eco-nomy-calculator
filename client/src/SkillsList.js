import React, {Component} from 'react'
import skillStore from './Stores/SkillStore'
import {findElement, multiplierToPercent, percentToMultiplier} from './Utils/Util'
import Select from 'react-select';

const customStyles = {
    container: (provided, state) =>({
        ...provided,
        'flex-grow':2,
        width:300,
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

        this.onDropdownChange = this.onDropdownChange.bind(this);
        this.updateEff = this.updateEff.bind(this);
        this.getDropdownData = this.getDropdownData.bind(this);
        this.getSkillStoreData = this.getDropdownData.bind(this);
    }

    static getDerivedStateFromError(error) {
      // Update state so the next render will show the fallback UI.
      return { hasError: true };
    }

    componentDidMount() {
        this.removeListener = skillStore.addListener((state) => {
            this.setState({
                data: state.data
            })
            this.getDropdownData();
        })
    }

    componentWillUnmount(){
        this.removeListener()
    }

    getSkillStoreData(){
        this.setState({
            data: skillStore.getSkills()
        })
    }

    onDropdownChange(selectionObject,action){
        if(action.action === 'select-option'){
            findElement(this.state.data,'name',selectionObject.value)
                .then((resolve) => {
                    selectionObject.eff = multiplierToPercent(resolve.multiplier);
                    this.setState({selectedValue:selectionObject})
                },(error) => console.log(error))
            
        }
    }
    getDropdownData() {
        var result = []
        const skills = this.state.data
        for(var i = 0; i < skills.length; i ++){
            result.push({value: skills[i].name, label: skills[i].name + ' (' + multiplierToPercent(skills[i].multiplier) + '%)'})
        }
        this.setState({dropdownData: result});
    }

    updateEff(e) {
        if (e.target.value >= 100 || e.target.value < 0) {
            //Trigger the hidden span to show error to user
        } else {
            var currentData = this.state.data;
            var selecteValueData = this.state.selectedValue;
            findElement(currentData, 'name', e.target.name)
                .then((result) => {
                    result.multiplier = percentToMultiplier(e.target.value)
                    selecteValueData.eff = e.target.value;
                    this.setState({
                        data: currentData,
                        selectedValue: selecteValueData
                    });
                    skillStore.setSkills({
                        data: currentData
                    });
                    this.getDropdownData();
                    // document.getElementById('skillSelector').value = this.state.selectedValue.value;
                }, (error) => {
                    if(typeof(error) != ReferenceError)
                        console.log(error);
                });
        }
    }

    render(){
        if(this.state.hasError){
            return <h1>Someting went wrong.</h1>
        }
        return(
            <div className={this.props.className}>
            <Select
                options = {this.state.dropdownData}
                styles = {customStyles}
                placeholder = "Select a specialty..."
                onChange = {this.onDropdownChange}
                id = 'skillSelector'
            />
            <input 
                type='text'
                value = {this.state.selectedValue.eff} 
                name={this.state.selectedValue.value} 
                id='effInput' 
                onChange={this.updateEff} 
                style={{width:'25px', height: '30px'}}/>
            <span>%</span>
            <span hidden>Value must be between 0 and 99</span>
            </div>
        )
    }
}

export default SkillList;