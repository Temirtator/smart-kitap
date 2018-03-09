import React, { Component, PropTypes } from 'react'
var PieChart = require("react-chartjs").Pie

var chartOptions = {
	responsive: true,

	//Boolean - Whether we should show a stroke on each segment
	segmentShowStroke : true,

	//String - The colour of each segment stroke
	segmentStrokeColor : "#457bc0",

	//Number - The width of each segment stroke
	segmentStrokeWidth : 2,

	//Number - The percentage of the chart that we cut out of the middle
	percentageInnerCutout : 70, // This is 0 for Pie charts
	
	//Number - Amount of animation steps
	animationSteps : 100,

	//String - Animation easing effect
	animationEasing : "easeOutBounce",
	
	//Boolean - Whether we animate the rotation of the Doughnut
	animateRotate : true,

	//Boolean - Whether we animate scaling the Doughnut from the centre
	animateScale : false,

	//String - A legend template
	legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"><%if(segments[i].label){%><%=segments[i].label%><%}%></span></li><%}%></ul>"
}


class PieComponentDuration extends Component {
    static propTypes = {
    	chartData: PropTypes.array.isRequired,
    	itemName: PropTypes.array.isRequired
    }

    render() {
    	let { chartData, itemName } = this.props
    	return (
        	<div className="pie-component">
	            <div className="pie-component__graphic">
	            	<PieChart data={chartData} options={chartOptions}/>
	            </div>
	            <div className="pie-component__text__duration">
	            	<div className="pie-component__text__wrap">
		    			{/*<div className="round"></div>*/}
		    			<p>{chartData[0].value}</p>
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

export default PieComponentDuration
