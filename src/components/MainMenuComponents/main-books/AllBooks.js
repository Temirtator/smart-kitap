import React, { Component } from 'react'
import BookItem from '../BookItemComponent'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router'
import * as appStateControlActions from '../../../actions/appStateControl'
import ReactGA from 'react-ga'
import PropTypes from 'prop-types'

class AllBooks extends Component {
    constructor(props) {
      super(props)
      this.bookFilter = this.bookFilter.bind(this)
      ReactGA.initialize('UA-66591915-12')
      ReactGA.pageview('/Все книги')
    }
    //У тебя это не работало
    bookFilter(book) {
        let { searchBookText } = this.props.appStateControl
        return (String(book.name).toLowerCase()).match(searchBookText.toLowerCase()) || (String(book.author).toLowerCase()).match(searchBookText.toLowerCase())
    }
    componentDidMount() {
      // call to system that this is all_books category, important
      this.props.appStateControlActions.setBookCategory('all_books')  
    }
    componentWillUnmount() {
      this.props.appStateControlActions.setSearchBook('')
    }
    render() {
        let filteredBooks = this.props.all_books.filter(this.bookFilter)
        console.log(filteredBooks.length);
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

AllBooks.propTypes = {
  all_books: PropTypes.array.isRequired,
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
)(AllBooks))
