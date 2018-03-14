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

    createMarkup() {
        return {__html: this.props.book}
    }
    componentDidMount () {
        // window.MathJax.Hub.Queue(["Typeset",MathJax.Hub, ReactDOM.findDOMNode(this)]);
    }

    componentDidUpdate () {
        // window.MathJax.Hub.Queue(["Typeset",MathJax.Hub, ReactDOM.findDOMNode(this)]);
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
