import React, { Component, PropTypes } from 'react'
import {PieChart} from 'react-easy-chart'

class PieItemDuration extends Component {
    static propTypes = {
    	chartData: PropTypes.array.isRequired,
    	itemName: PropTypes.array.isRequired
    }

    render() {
    	let { chartData, itemName } = this.props
    	return (
        	<div className="pie-component">
	            <div className="pie-component__graphic">
	            	<PieChart
					    size={100}
					    innerHoleSize={60}
					    data={chartData}
					  />
	            </div>
	            <div className="pie-component__text__duration">
	            	<div className="pie-component__text__wrap">
		    			{/*<div className="round"></div>*/}
		    			<p>{ chartData[0].value }</p>
		    			<p>{ itemName[0] }</p>
		    		</div>
		    		{/*<div className="pie-component__text__wrap">
	    				<div className="round1"></div>
	    				<p>{(itemName.length > 1) ? itemName[1] : itemName[0]} </p>
	    			</div>*/}
	    		</div>
	        </div>
        )
    }
}

export default PieItemDuration
