import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import * as precis_action from '../actions/precis'
import { bindActionCreators } from 'redux'
import Masonry from 'react-masonry-infinite'
import OldPreciseItem from './OldPreciseItemComponent'

class OldPrecises extends Component {
    constructor(props) {
        super(props)
        this.state = {
            hasMore: false,
            book_id: null,
            indexPrecise: null,
            indexBook: null,
            name: '',
            author: '',
            img: ''
        }

        this.loadMorePrecis = this.loadMorePrecis.bind(this)
        this.getIndexes = this.getIndexes.bind(this)
    }
    
    loadMorePrecis() {
    	console.log('load more precis')
    }

    getIndexes(book_id, book_category) {
        let old_precises = this.props.precisesStore.precises.old_precises
        let indexPrecise, indexBook
        for (var i = old_precises.length - 1; i >= 0; i--) {
            console.log(old_precises[i].book_id, '===', book_id)
            if (old_precises[i].book_id === book_id) {
                indexPrecise = i
            }
        }

        if (indexPrecise === undefined) { // if there is no precise for book
            let oldPreciseObject = { // creating empty old precise
                book_id: book_id,
                precise: [] 
            }

            this.props.precisActions.setOldBookPrecis(oldPreciseObject) // adding old precise
            indexPrecise = old_precises.length-1 //assign index value position of old precise to access them 
        }

        for (var j = book_category.length - 1; j >= 0; j--) {
            console.log(book_category[j].id, '===', book_id)
            if (book_category[j].id === book_id) {
                indexBook = j
            }
        }

        let { name, author, img } = book_category[indexBook]

        this.setState({
            name,author,img, indexPrecise
        })
    }

    componentWillMount() {
        let { book_id } = this.props.location.state
        let book_id_local
        if (book_id !== undefined) {
            this.setState({
                book_id: book_id
            })
            book_id_local = book_id
        }
        else {
            this.setState({
                book_id: this.props.appStateControl.openedBookId
            })
            book_id_local = book_id
        }

        let { opened_book_category } = this.props.appStateControl
        let selected_book_item, opened_book_menu = localStorage.getItem('opened_book_menu')
        if (opened_book_menu === 'main_books') {
            selected_book_item = this.props.main_book_item
        } 
        else if (opened_book_menu === 'my_books') {
            selected_book_item = this.props.my_book_item
        }
        let { all_books, humanitarian_books, technical_books, medical_books } = selected_book_item
        let book_category
        switch(opened_book_category) {
            case 'all_books':
                book_category = all_books
                break
            case 'humanitarian_books':
                book_category = humanitarian_books
                break
            case 'technical_books':
                book_category = technical_books
                break
            case 'medical_books':
                book_category = medical_books
                break
            default:
                book_category = all_books
                break
        }
        this.getIndexes(Number(book_id_local), book_category)
    }

   	render() {
    	let { precisesStore, appStateControl } = this.props
        let book_id = Number(this.state.book_id)
        let { indexPrecise, name, author, img } = this.state

    	return (
            
            <div className="new-precises">
	        	<Masonry
		            className="masonry"
		            
		            loader={
		              <div className="sk-folding-cube">
		                <div className="sk-cube1 sk-cube" />
		                <div className="sk-cube2 sk-cube" />
		                <div className="sk-cube4 sk-cube" />
		                <div className="sk-cube3 sk-cube" />
		              </div>
		            }
		            sizes={[
		            		{ mq: '400px', columns: 1, gutter: 0 },
					      	{ mq: '400px', columns: 2, gutter: 25 }]}
		            loadMore={this.loadMorePrecis}
		          >
		            {
		            	precisesStore.precises.old_precises[indexPrecise].precise.map((object, i) => (
		            		<OldPreciseItem 
                                name={name}
                                author={author}
                                img={img}
                                text={object.precis}
                                index={i}
                                book_id={book_id}
                                key={i}
                            />
			            ))
			        }
	          </Masonry>
		   	</div>
        )
    }
}

const mapStateToProps = state => ({
   precisesStore: state.precis,
   main_book_item: state.main_book_item,
   my_book_item: state.my_book_item,
   appStateControl: state.appStateControl
})

const mapDispatchToProps = dispatch => ({
   precisActions: bindActionCreators(precis_action, dispatch),
})

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(OldPrecises))