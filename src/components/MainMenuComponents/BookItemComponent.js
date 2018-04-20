import React, { Component, PropTypes } from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as appStateControlActions from '../../actions/appStateControl'
import * as bookRequestActions from '../../actions/booksRequest'
import * as checkConnectivity from '../../actions/checkConnectivity'
import { url as url_api } from '../../path.json'

class BookItem extends Component {
	static propTypes = {
		img: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		author: PropTypes.string.isRequired,
		isMyBook: PropTypes.bool.isRequired,
		book_id: PropTypes.number.isRequired
	}
	
	constructor(props) {
		super(props)

		this.state = {
			isMyBook: this.props.isMyBook,
			license_token: window.localStorage.getItem('license_token'),
			access_token: window.localStorage.getItem('access_token')
		}

		this.onClickHandler = this.onClickHandler.bind(this)
		this.setMyBookState = this.setMyBookState.bind(this)
	}
	
	onClickHandler() {
		let { book_id, img, name, author } = this.props
		window.localStorage.setItem('book_id', book_id)
		this.props.history.push({ 
                    pathname: '/book', 
                    state: { 
                    	book_id: book_id,
                    	img: img,
                    	name: name,
                    	author: author 
                    }
        })
	}
	
	setMyBookState(e) {
		e.persist()
		this.setState({
			isMyBook: e.target.checked
		})	
		this.props.checkConnectivity.onlineCheck().then(() => {
			let { license_token, access_token } = this.state
			let { book_id } = this.props
			this.props.bookRequestActions.addToFavouriteBooks(license_token, access_token, book_id, e.target.checked)
		})
		.catch(() => {
			alert('Интернет не работает. Пожалуйста проверьте ваше соединениеfwefwefwe')
		})
	}
	
	render() {
		let { img, name, author} = this.props
		
        return (
            <div className="col-sm-4 books__book" >
				<img 	onClick={this.onClickHandler} src={ url_api + img}
						alt="book image" />
				<div className="books__book__wrap">
					<div className="books__book__text__wrap col-md-10">
						<p 	title={name} 
							className="books__book__name">{name}</p>
						<p 	title={author} 
							className="books__book__author">{author}</p>
					</div>
					<input 	className="star" 
							type="checkbox" 
							title="bookmark page" 
							onChange={this.setMyBookState} 
							checked={this.state.isMyBook} />
				</div>
			</div>
        )
    }
}

const mapStateToProps = state => ({
  appStateControl: state.appStateControl
})

const mapDispatchToProps = dispatch => ({
  appStateControlActions: bindActionCreators(appStateControlActions, dispatch),
  bookRequestActions: bindActionCreators(bookRequestActions, dispatch),
  checkConnectivity: bindActionCreators(checkConnectivity, dispatch)
})

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(BookItem))
