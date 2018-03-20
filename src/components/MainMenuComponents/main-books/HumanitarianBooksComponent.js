import React, { Component, PropTypes } from 'react'
import BookItem from '../BookItemComponent'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router'
import * as appStateControlActions from '../../../actions/appStateControl'

class HumanitarianBooks extends Component {
  static propTypes = {
    humanitarian_books: PropTypes.array.isRequired,
    isMyBook: PropTypes.bool.isRequired
  }
  
  constructor(props) {
    super(props)

    this.bookFilter = this.bookFilter.bind(this)
  }

  bookFilter(book) {
    let { searchBookText } = this.props.appStateControl
    return (String(book.name).toLowerCase()).match(searchBookText.toLowerCase()) || (String(book.author).toLowerCase()).match(searchBookText.toLowerCase())
  }

  componentDidMount() {
    this.props.appStateControlActions.setBookCategory('humanitarian_books')
  }
  
  render() {
        let filteredBooks = this.props.humanitarian_books.filter(this.bookFilter)
        return (
            <div className="books">
              { filteredBooks.map((value, i) => 
                <BookItem   img={value.cover} 
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

const mapStateToProps = state => ({
  appStateControl: state.appStateControl
})

const mapDispatchToProps = dispatch => ({
  appStateControlActions: bindActionCreators(appStateControlActions, dispatch)
})

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(HumanitarianBooks))
