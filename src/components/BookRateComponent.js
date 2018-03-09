import React, { Component, PropTypes } from 'react'
import StarRatingComponent from 'react-star-rating-component'

class BookRate extends Component {
	static PropTypes = {
		rating: PropTypes.number.isRequired,
        id: PropTypes.number.isRequired
	}

    constructor(props) {
        super(props)

        this.state = {
        	rating: 1
        }
        this.onStarClick = this.onStarClick.bind(this)
    }

    componentDidMount() {
    	this.setState({
    		rating: this.props.rating
    	})
    }

    onStarClick(nextValue, prevValue, name) {
        this.setState({rating: nextValue});
    }

    render() {
    	const { rating } = this.state
        
        return (
        	<div className="book-rate">
        		<StarRatingComponent
        			style={{display: 'grid'}} 
                    name={'rate' + this.props.id}
                    starCount={5}
                    value={rating}
                    onStarClick={this.onStarClick}
                />
        	</div>   
        )
    }
}

export default BookRate
