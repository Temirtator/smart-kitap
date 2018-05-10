import React, { Component } from 'react'
import {PieChart} from 'react-easy-chart'
import PropTypes from 'prop-types'

class PieItemProgress extends Component {
    render() {
    	let { chartData, itemName } = this.props
    	return (
        	<div className="pie-component">
	            <div className="pie-component__graphic">
	            	{/*<PieChart ref="progressCanvas" data={chartData} options={chartOptions} />*/}
	            	<PieChart
					    labels
					    size={100}
					    data={chartData}
					    styles={{
					      '.chart_text': {
					        fontSize: '1em',
					        fill: '#fff'
					      },
					      '.pie-chart-label': {
					      	'text-anchor': 'end', 'font-size': '9px'
					      },
					      '.pie-chart-label:nth-child(2)': {
					      	'text-anchor': 'inherit'
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

PieItemProgress.propTypes = {
	chartData: PropTypes.array.isRequired,
	itemName: PropTypes.array.isRequired
}

export default PieItemProgress
