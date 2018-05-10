import React, { Component, PropTypes } from 'react'
import $ from 'jquery'
window.jQuery = window.$ = $
require('bootstrap/dist/js/bootstrap.js')


class Dropdown extends Component {
    static propTypes = {
        selections: PropTypes.array.isRequired,
        returnSelect: PropTypes.func.isRequired,
        selected: PropTypes.number
    }

    constructor(props) {
        super(props)
        this.state = {
        	dropdownValue: ''
        }

        this.dropdownOnSelect = this.dropdownOnSelect.bind(this)
    }

    dropdownOnSelect(value, index) {
    	this.setState({
    		dropdownValue: value
    	})
        
        if (index !== undefined)
            this.props.returnSelect(index)
    }
    
    componentDidMount() {
    	//set default language
        this.dropdownOnSelect(this.props.selections[this.props.selected])
    }
    
    render() {
    	let {dropdownValue} = this.state
    	let {selections} = this.props
        return (
            <li className="dropdown">
		      <a className="dropdown-toggle" data-toggle="dropdown" href="#">
		      	{dropdownValue} <span className="caret"></span>
		      </a>
		      <ul className="dropdown-menu">
		      	{
		      		selections.map((value, index) =>
		      			<li key={index} onClick={() => this.dropdownOnSelect(value, index)}>{value}</li>		
		      		)
		      	}          
		      </ul>
		    </li>
        )
    }
}

export default Dropdown
