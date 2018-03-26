import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import * as precis_action from '../../actions/precis'
import { bindActionCreators } from 'redux'
import Masonry from 'react-masonry-infinite'
import OldPreciseItem from './OldPreciseItemComponent'

let oldPrecisesArray = []
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
            img: '',
            localStorage: window.localStorage.getItem('access_token')
        }

        this.loadMorePrecis = this.loadMorePrecis.bind(this)
        this.getIndexes = this.getIndexes.bind(this)
    }
    
    loadMorePrecis() {
    	console.log('load more precis')
    }

    getIndexes(book_id) {
        //console.log('book_id', book_id, 'book_category', book_category)
        let new_precises = this.props.precisesStore.precises.new_precises
        let indexPrecise, indexBook
        for (var i = new_precises.length - 1; i >= 0; i--) {
            //console.log(new_precises[i].book_id, '===', book_id)
            if (Number(new_precises[i].book_id) === Number(book_id)) {
                indexPrecise = i
            }
        }
        
        if (indexPrecise === undefined) { // if there is no precise for book
            let newPreciseObject = { // creating empty new precise
                book_id: book_id,
                precise: [] 
            }
            
            this.props.precisActions.setNewBookPrecis(newPreciseObject) // adding new precise
            indexPrecise = new_precises.length-1 //assign index value position of new precise to access them 
        }

        this.setState({
            indexPrecise
        })

        oldPrecisesArray = [] // this is because, some data may pushed here several times, so we need it set to zero
        let somePrecise = new_precises[indexPrecise].precise
        
        let today = new Date()
        let day1 = today.getDate()
        let month1 = today.getMonth() + 1
        let year1 = today.getFullYear()
        let currentDate = month1 + '/' + day1 + '/' + year1
        
        for (var i = somePrecise.length - 1; i >= 0; i--) {
            let created_date = somePrecise[i].created_at
            let day = new Date(created_date).getDate()
            let month = new Date(created_date).getMonth() + 1
            let year = new Date(created_date).getFullYear()
            let precisDate = month + '/' + day + '/' + year
            let timeDiff = Math.abs(new Date(currentDate).getTime() - new Date(precisDate).getTime())
            let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24))
            //console.log('diffDays', diffDays)
            if (diffDays >= 30) { // if 1 or more month then ...
                oldPrecisesArray.push(somePrecise[i])
            }
        }
        this.props.precisActions.getUserOldPrecis(oldPrecisesArray)
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
        
        this.getIndexes(Number(book_id_local))   
    }
    
   	render() {
    	let { precisesStore, appStateControl } = this.props
        let book_id = Number(this.state.book_id)
        let { indexPrecise } = this.state
        let { name, author, img } = this.props.precisesStore.precises

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
		            	precisesStore.precises.old_precises.map((object, i) => (
		            		<OldPreciseItem 
                                name={name}
                                author={author}
                                img={img}
                                text={object.precis}
                                index={i}
                                precis_id={object.precis_id}
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