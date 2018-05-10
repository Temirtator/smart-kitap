import React, {Component} from 'react'
import $ from 'jquery'
import PropTypes from 'prop-types'

class Book extends Component {
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
        setTimeout(() => {
            try {
                let script = $('.mceNonEditable').children('script')
                for(let i=0;i<script.length;i++){
                    window.eval(script[i].innerHTML)
                }
            } catch (e) {
                console.error('HTML_ERROR', e)
            }
        }, 3000)
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

Book.propTypes = {
    book: PropTypes.string.isRequired
}


export default Book
