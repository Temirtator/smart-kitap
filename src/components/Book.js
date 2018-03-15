import React, {Component, PropTypes} from 'react'
import Model3d from './Model3d'
import $ from 'jquery'
import ImageZoom from 'react-medium-image-zoom'

import MathJax from 'mathjax'
import ReactDOM from 'react-dom'
let Highlight = require('react-highlighter')

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

    componentDidMount() {
        setTimeout(() => {
            let maths = document.getElementsByTagName('math')
            for (let i = 0; i < maths.length; i++) {
                let mathFormulat = (maths[i].innerHTML + '')
                let generateImg = 'http://www.wiris.net/demo/editor/render?mml=' + encodeURIComponent('<math>' + mathFormulat + '</math>')
                maths[i].innerHTML = '<img src="' + generateImg + '"/>'
            }
        }, 1000)

    }

    renderBook() {
        return <Highlight search="Учебное" matchClass="bro"><div className="book" dangerouslySetInnerHTML={this.createMarkup()}/></Highlight>
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
