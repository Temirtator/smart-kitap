import React, {Component, PropTypes} from 'react'
import Model3d from './Model3d'
import $ from 'jquery'
import ImageZoom from 'react-medium-image-zoom'

import MathJax from 'mathjax'
import ReactDOM from 'react-dom'
class Book extends Component {
    static propTypes = {
        book: PropTypes.string.isRequired
    }

    constructor(props) {
        super(props)

        this.createMarkup = this.createMarkup.bind(this)
        this.renderBook = this.renderBook.bind(this)
    }

    dynamicallyLoadScript(url) {
        var script = document.createElement('script'); // Make a script DOM node
        script.src = url; // Set it's src to the provided URL

        document.head.appendChild(script); // Add it to the end of the head section of the page (could change 'head' to 'body' to add it to the end of the body section instead)
    }

    createMarkup() {
        return {__html: this.props.book}
    }

    renderBook() {
        return <div className="book" dangerouslySetInnerHTML={this.createMarkup()}/>
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
