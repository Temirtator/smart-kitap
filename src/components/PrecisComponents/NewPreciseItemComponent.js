import React, { Component, PropTypes } from 'react'
import PreciseTextInput from './PreciseTextInputComponent'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as precis_action from '../../actions/precis'
import * as appStateControlActions from '../../actions/appStateControl'
import * as checkConnectivity from '../../actions/checkConnectivity'
import { withRouter } from 'react-router'

class NewPreciseItem extends Component {
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
        this.props.checkConnectivity.onlineCheck().then(() => {
            if (text.length === 0) {
            //this.props.deleteTodo(id);
            } else {
                let { new_precises } = this.props.precisesStore.precises 
                let newPrecises, book_position
                for (var i = new_precises.length - 1; i >= 0; i--) { // iterate over 
                    if (Number(new_precises[i].book_id) === Number(this.props.book_id)) {
                        newPrecises = new_precises[i].precise //array of object
                        book_position = i
                        break
                    }
                }
                newPrecises[id].precis = text
                this.props.precisActions.changeNewPrecis(book_position, newPrecises)
            }
            this.setState({
                editing: false
            })   
        })
        .catch(() => {
            alert('Интернет не работает. Пожалуйста проверьте ваше соединение')
        })
    }
    
    //for clearing precises
    clearPrecis(index, precis_id) {
        this.props.checkConnectivity.onlineCheck().then(() => {
            let { precises } = this.props.precisesStore
            let { access_token, license_token } = this.state
            let newPrecises, book_position
            for (var i = precises.new_precises.length - 1; i >= 0; i--) {
                if (Number(precises.new_precises[i].book_id) === Number(this.props.book_id)) {
                    newPrecises = precises.new_precises[i].precise //array of object
                    book_position = i
                    break
                }
            }
            newPrecises.splice(index, 1)
            this.props.precisActions.changeNewPrecis(book_position, newPrecises)
            this.props.precisActions.clearBookPrecis(access_token, license_token, precis_id)  
        })
        .catch(() => {
            alert('Интернет не работает. Пожалуйста проверьте ваше соединение')
        })
    }
    
    scrollToPrecis(book_page_id) {
        this.props.checkConnectivity.onlineCheck().then(() => {
            this.props.appStateControlActions.setBookScrollPos(book_page_id) 
            this.props.history.goBack()  
        })
        .catch(() => {
            alert('Интернет не работает. Пожалуйста проверьте ваше соединение')
        })
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
            if (Number(new_precises[i].book_id)  === Number(book_id)) {
                book_position = i
            }
        }
        
        return (
         	<div className="col-sm-6 new-precise">    			
    			<div className="new-precise__header" >
	    			{/*<div className="new-precise__header__left">
	    				<img src={'http://smartkitap.avsoft.kz' + img} alt="book" />
	    			</div>*/}
	    			<div className="new-precise__header__right">
	    				<div className="new-precise__header__right__first-lvl">
	    					{/*<div className="col-sm-10">
	    						<h5>{name}</h5>
	    					</div>*/}
	    					<div className="col-sm-2">
	    						{/*<div className="precisEdit" onClick={() => this.editPrecis(index, text)}>
                                    <i className="fas fa-pencil-alt"></i>
                                </div>*/}
	    						<div className="precisClear" onClick={() => this.clearPrecis(index, precis_id)}>
                                    <i className="fas fa-eraser"></i>
                                </div>
	    					</div>
	    				</div>
	    				{/*<div className="new-precise__header__right__second-lvl">
	    					<p>{author}</p>
	    				</div>*/}
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
   appStateControlActions: bindActionCreators(appStateControlActions, dispatch),
   checkConnectivity: bindActionCreators(checkConnectivity, dispatch)
})

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(NewPreciseItem))
