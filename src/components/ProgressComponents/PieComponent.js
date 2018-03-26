import React, { Component, PropTypes } from 'react'
import {PieChart} from 'react-easy-chart'

class PieComponent extends Component {
    static propTypes = {
    	chartData: PropTypes.array.isRequired,
    	itemName: PropTypes.array.isRequired
    }
    
    render() {
    	let { chartData, itemName } = this.props
    	return (
        	<div className="pie-component">
	            <div className="pie-component__graphic">
	            	{/*<PieChart ref="progressCanvas" data={chartData} options={chartOptions} />*/}
	            	<PieChart
					    labels
					    size={200}
					    data={chartData}
					    styles={{
					      '.chart_text': {
					        fontSize: '1em',
					        fill: '#fff'
					      }
					    }}
					  />
	            </div>
	            <div className="pie-component__text">
	            	<div className="pie-component__text__wrap">
		    			<div className="round"></div>
		    			<p>{ itemName[0] } {chartData[0].value}</p>
		    		</div>
		    		<div className="pie-component__text__wrap">
	    				<div className="round1"></div>
	    				<p>{(itemName.length > 1) ? itemName[1] : itemName[0]} {chartData[1].value}</p>
	    			</div>
	    		</div>
	        </div>
        )
    }
}

export default PieComponent
