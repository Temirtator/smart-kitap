import React, { Component, PropTypes } from 'react'
import PreciseTextInput from './PreciseTextInputComponent'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as precis_action from '../actions/precis'
import * as appStateControlActions from '../actions/appStateControl'
import { withRouter } from 'react-router'

class OldPreciseItem extends Component {
    static propTypes = {
         text: PropTypes.string.isRequired,
        index: PropTypes.number.isRequired,
        book_id: PropTypes.number.isRequired,
        precis_id: PropTypes.number.isRequired
    }
    
    constructor(props) {
        super(props)

        this.state = {
            editing: false,
            editingText: '',
            editingId: null,
            name: window.localStorage.getItem('name'),
            img: window.localStorage.getItem('img'),
            author: window.localStorage.getItem('author'),
            access_token: window.localStorage.getItem('access_token'),
            license_token: window.localStorage.getItem('license_token')
        }
        this.editPrecis = this.editPrecis.bind(this)
        this.clearPrecis = this.clearPrecis.bind(this)
        this.scrollToPrecis = this.scrollToPrecis.bind(this)
        this.renderForm = this.renderForm.bind(this)
    }

    //function for editting precis
    editPrecis(index, text) {
        this.setState({
            editing: true,
            editingText: text,
            editingId: index
        })
    }
    
    savePrecis(id, text) {
    	if (text.length === 0) {
	      	//this.props.deleteTodo(id);
	    } else {
	    	let { precises } = this.props.precisesStore
	        let oldPrecises, book_position
	        for (var i = precises.old_precises.length - 1; i >= 0; i--) {
	            if (precises.old_precises[i].book_id === this.props.book_id) {
	                oldPrecises = precises.old_precises[i].precise //array of object
	                book_position = i
	                break
	            }
	        }
            oldPrecises[id].precis = text
	        this.props.precisActions.changeOldPrecis(book_position, oldPrecises)
	    }
        this.setState({
            editing: false
        })
    }
    
    //for clearing precises
    clearPrecis(index, precis_id) {
        let { precises } = this.props.precisesStore
        let { access_token, license_token } = this.state
        
        let oldPrecises = precises.old_precises //array of object
        oldPrecises.splice(index, 1)
        this.props.precisActions.changeOldPrecis(oldPrecises)
        this.props.precisActions.clearBookPrecis(access_token, license_token, precis_id)
    }
    
    scrollToPrecis(book_page_id) {
        this.props.appStateControlActions.setBookScrollPos(book_page_id) 
        this.props.history.goBack()
    }
    
    renderForm() {
        let { editingId, editing, editingText } = this.state
        
        return (
            <div>
                <PreciseTextInput   text={editingText}
                                    editing={editing}
                                    newPrecise={true}
                                    onSave={(text) => this.savePrecis(editingId, text)} />
            </div>
        )
    }
    
    render() {
    	let { text, index, precisesStore, book_id, precis_id } = this.props
        let { editing, editingText, name, author, img } = this.state
        let { new_precises } = precisesStore.precises
        let book_position
        for (var i = new_precises.length - 1; i >= 0; i--) { //defining the position of the books in the array
            if (Number(new_precises[i].book_id) === Number(book_id)) {
                book_position = i
            }
        }

        return (
         	<div className="col-sm-6 new-precise">    			
    			<div className="new-precise__header" >
	    			<div className="new-precise__header__left">
	    				<img src={'http://smartkitap.avsoft.kz' + img} alt="book" />
	    			</div>
	    			<div className="new-precise__header__right">
	    				<div className="new-precise__header__right__first-lvl">
	    					<div className="col-sm-10">
	    						<h5>{name}</h5>
	    					</div>
	    					<div className="col-sm-2">
	    						{/*<div className="precisEdit" onClick={() => this.editPrecis(index, text)}>
                                    <i className="fas fa-pencil-alt"></i>
                                </div>*/}
	    						<div className="precisClear" onClick={() => this.clearPrecis(index, precis_id)}>
                                    <i className="fas fa-eraser"></i>
                                </div>
	    					</div>
	    				</div>
	    				<div className="new-precise__header__right__second-lvl">
	    					<p>{author}</p>
	    				</div>
	    			</div>
	    		</div>
                
        		<div onClick={() => this.scrollToPrecis(new_precises[book_position].precise[index].book_page_id)} className="new-precise__body">
        			{ editing ? this.renderForm() : <p>{text}</p>}
        		</div>
        	</div>   
        )
    }
}

const mapStateToProps = state => ({
   precisesStore: state.precis
})

const mapDispatchToProps = dispatch => ({
   precisActions: bindActionCreators(precis_action, dispatch),
   appStateControlActions: bindActionCreators(appStateControlActions, dispatch)
})

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(OldPreciseItem))
