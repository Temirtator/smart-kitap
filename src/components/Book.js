import React, { Component, PropTypes } from 'react'
import Model3d from './Model3d'
import $ from 'jquery'
import ImageZoom from 'react-medium-image-zoom'


class Book extends Component {
    static propTypes = {
        book: PropTypes.string.isRequired
    }
    
    constructor(props) {
        super(props)
    	
        this.createMarkup = this.createMarkup.bind(this)
        this.renderBook = this.renderBook.bind(this)
    }
    
    createMarkup() {
        return { __html: this.props.book }
    }
    
    renderBook() {
        return <div className="book" dangerouslySetInnerHTML={this.createMarkup()} />
    }
    
    render() {
        return (
            <div>
                {this.renderBook()}
            </div>
        )
    }
}

export default Book
