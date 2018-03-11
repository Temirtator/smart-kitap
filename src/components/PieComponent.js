//import chartLabel from '../resources/chartLabel.js'
import React, { Component, PropTypes } from 'react'
var PieChart = require("react-chartjs").Pie

/*var chartData = [
	{
		value: 300,
		color:"#3e76bd",
		highlight: "#3e76bd",
		label: "pages"
	},
	{
		value: 150,
		color: "#bdd0e6",
		highlight: "#bdd0e6",
		label: "pages"
	}
]*/

var chartOptions = {
	responsive: true,

	//Boolean - Whether we should show a stroke on each segment
	segmentShowStroke : true,

	//String - The colour of each segment stroke
	segmentStrokeColor : "#fff",

	//Number - The width of each segment stroke
	segmentStrokeWidth : 2,

	//Number - The percentage of the chart that we cut out of the middle
	percentageInnerCutout : 0, // This is 0 for Pie charts
	
	//Number - Amount of animation steps
	animationSteps : 100,

	//String - Animation easing effect
	animationEasing : "easeOutBounce",
	
	//Boolean - Whether we animate the rotation of the Doughnut
	animateRotate : true,

	//Boolean - Whether we animate scaling the Doughnut from the centre
	animateScale : false,

	//String - A legend template
	legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"><%if(segments[i].label){%><%=segments[i].label%><%}%></span></li><%}%></ul>",

	pieceLabel: {
      // render 'label', 'value', 'percentage', 'image' or custom function, default is 'percentage'
      render: 'percentage',

      // precision for percentage, default is 0
      precision: 0,

      // identifies whether or not labels of value 0 are displayed, default is false
      showZero: true,

      // font size, default is defaultFontSize
      fontSize: 12,

      // font color, can be color array for each data or function for dynamic color, default is defaultFontColor
      fontColor: '#fff',

      // font style, default is defaultFontStyle
      fontStyle: 'normal',

      // font family, default is defaultFontFamily
      fontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",

      // draw label in arc, default is false
      arc: true,

      // position to draw label, available value is 'default', 'border' and 'outside'
      // default is 'default'
      position: 'default',

      // draw label even it's overlap, default is false
      overlap: true,

      // show the real calculated percentages from the values and don't apply the additional logic to fit the percentages to 100 in total, default is false
      showActualPercentages: true,

    }

}


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
	            	<PieChart data={chartData} options={chartOptions}/>
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
