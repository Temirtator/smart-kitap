import React, { Component } from 'react'
import BookItem from '../BookItemComponent'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router'
import * as appStateControlActions from '../../../actions/appStateControl'
import PropTypes from 'prop-types'

class TechnicalBooks extends Component {
    constructor(props) {
      super(props)
      this.bookFilter = this.bookFilter.bind(this)
    }
    bookFilter(book) {
      let { searchBookText } = this.props.appStateControl
      return (String(book.name).toLowerCase()).match(searchBookText.toLowerCase()) || (String(book.author).toLowerCase()).match(searchBookText.toLowerCase())
    }
    componentDidMount() {
      this.props.appStateControlActions.setBookCategory('technical_books')
    }
    render() {
        let filteredBooks = this.props.technical_books.filter(this.bookFilter)
        return (
            <div className="books">
            	{ filteredBooks.map((value, i) => 
      					<BookItem 	img={value.cover}
            								name={String(value.name)}
            								author={String(value.author)}
                            isMyBook={this.props.isMyBook ? true : value.isFavourite} //value.isFavourite
            								key={i}
                            book_id={Number(value.id)} />
              )}
      			</div>
        )
    }
}

TechnicalBooks.propTypes = {
  technical_books: PropTypes.array.isRequired,
  isMyBook: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
  appStateControl: state.appStateControl
})

const mapDispatchToProps = dispatch => ({
  appStateControlActions: bindActionCreators(appStateControlActions, dispatch)
})

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(TechnicalBooks))
