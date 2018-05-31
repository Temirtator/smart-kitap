import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import * as precis_action from '../../actions/precis'
import { bindActionCreators } from 'redux'
import Masonry from 'react-masonry-infinite'
import NewPreciseItem from './NewPreciseItemComponent'
import { ModalContainer } from 'react-modal-dialog'
import ReactSpinner from 'react-spinjs'

let textStyle = {
    color: 'white',
    position: 'absolute',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    left: 'calc(50vw + 125px)'
}
class NewPrecises extends Component {
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
            access_token: window.localStorage.getItem('access_token'),
            license_token: window.localStorage.getItem('license_token'),
            PrecisLoaded: true
        }
        this.loadMorePrecis = this.loadMorePrecis.bind(this)
        this.getIndexes = this.getIndexes.bind(this)
    }

    loadMorePrecis() {
    	console.log('load more precis')
    }

    getIndexes(book_id) {
        let new_precises = this.props.precisesStore.precises.new_precises
        let indexPrecise
        for (let i = new_precises.length - 1; i >= 0; i--) {
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
        let { license_token, access_token } = this.state
        this.props.precisActions.getUserPrecis(license_token, access_token, book_id_local)
        .then((error) => {
            this.setState({ PrecisLoaded: false })
        })
        this.getIndexes(Number(book_id_local))  
    }
    
   	render() {
    	let { precisesStore } = this.props
        let book_id = Number(this.state.book_id)
        let { indexPrecise, PrecisLoaded } = this.state
        let precises = precisesStore.precises.new_precises[indexPrecise].precise
        return (
            <div className="new-precises">
                { PrecisLoaded ? 
                    <ModalContainer>
                        <div>
                            <ReactSpinner color='#fff' />
                            <p style={textStyle}>Загружается конспекты...</p>
                        </div>
                    </ModalContainer> : null
                }
                {
                    (precises.length < 1) ? <p className="no-data-message">Нет конспектов</p> : null
                }
                <Masonry
		            className="masonry"
		            
		            // loader={
		            //   <div className="sk-folding-cube">
		            //     <div className="sk-cube1 sk-cube" />
		            //     <div className="sk-cube2 sk-cube" />
		            //     <div className="sk-cube4 sk-cube" />
		            //     <div className="sk-cube3 sk-cube" />
		            //   </div>
		            // }
		            sizes={[
		            		{ mq: '400px', columns: 1, gutter: 0 },
					      	{ mq: '400px', columns: 2, gutter: 25 }]}
		            loadMore={this.loadMorePrecis}>
		            {
		            	precises.map((object, i) => 
		            		<NewPreciseItem
                                text={object.precis}
                                index={i}
                                precis_id={object.precis_id}
                                book_id={book_id}
                                key={i}
                            />
			            )
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
    precisActions: bindActionCreators(precis_action, dispatch)
})

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(NewPrecises))