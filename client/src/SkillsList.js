import React, {Component} from 'react'
import skillStore from './Stores/SkillStore'
import {findElement, multiplierToPercent, percentToMultiplier} from './Utils/Util'
import Select from 'react-select';


class SkillList extends Component{
    
    constructor(props){
        super(props)
        this.state = {
            selectedSkill:{
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
            const skill = this.state.data.find(skill => skill.id === selectionObject.id)
            selectionObject.eff = multiplierToPercent(skill.multiplier)
            this.setState({selectedSkill:selectionObject})
            
        }
    }
    getDropdownData() {
        var result = []
        const skills = this.state.data
        for(var i = 0; i < skills.length; i ++){
            result.push({id: skills[i].id, label: skills[i].name + ' (' + multiplierToPercent(skills[i].multiplier) + '%)'})
            if(this.select && this.state.selectedSkill.id && this.state.selectedSkill.id === skills[i].id){
                this.select.state.value = result[i]
            }
        }
            
        this.setState({dropdownData: result});
    }

    updateEff(e) {
        if (e.target.value >= 100 || e.target.value < 0) {
            //Trigger the hidden span to show error to user
        } else {
            var currentData = this.state.data;
            var selecteValueData = this.state.selectedSkill;
            var selectedSkill = currentData.find( d => d.id == e.target.attributes.skillid.value)
            selectedSkill.multiplier = percentToMultiplier(e.target.value)
            selecteValueData.eff = e.target.value;
            this.setState({
                data: currentData,
                selectedSkill: selecteValueData
            });
            skillStore.setState({
                data: currentData
            });
            this.getDropdownData();
        }
    }

    render(){

        const customStyles = {
            container: (provided) =>({
                ...provided,
                'flex-grow':2,
                width:300,
                'padding-right': '10px'
            })
            
        }
        if(this.state.hasError){
            return <h1>Someting went wrong.</h1>
        }
        return(
            <div className={this.props.className}>
            <Select
                ref= {(ref) => this.select = ref}
                options = {this.state.dropdownData}
                styles = {customStyles}
                placeholder = "Select a specialty..."
                onChange = {this.onDropdownChange}
                id = 'skillSelector'
            />
            <input 
                type='text'
                value = {this.state.selectedSkill.eff} 
                name={this.state.selectedSkill.id}
                id='effInput' 
                skillid = {this.state.selectedSkill.id}
                onChange={this.updateEff} 
                style={{width:'25px', height: '30px'}}/>
            <span>%</span>
            <span hidden>Value must be between 0 and 99</span>
            </div>
        )
    }
}

export default SkillList;