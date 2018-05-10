import React, { Component } from 'react'
import PropTypes from 'prop-types'
import $ from 'jquery'
window.jQuery = window.$ = $
require('bootstrap/dist/js/bootstrap.js')

class Dropdown extends Component {
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
		      <a className="dropdown-toggle" data-toggle="dropdown">
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
Dropdown.propTypes = {
    selections: PropTypes.array.isRequired,
    returnSelect: PropTypes.func.isRequired,
    selected: PropTypes.number
}
export default Dropdown
