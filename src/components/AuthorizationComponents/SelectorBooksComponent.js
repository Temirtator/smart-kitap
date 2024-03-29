import React, { Component } from 'react'
import { ModalContainer } from 'react-modal-dialog'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as bookRequest from '../../actions/booksRequest'
import * as checkConnectivity from '../../actions/checkConnectivity'
import { url as url_api } from '../../path.json'

class SelectorBooks extends Component {

	state = {
		license_token: window.localStorage.getItem('license_token'),
		access_token: window.localStorage.getItem('access_token'),
		orders: [],
		organization: 'Университет им. Сулеймана Демиреля',
		phone_number: '+7777 777 77 77',
		contact_email: 'sdu@gmail.com',
		address: 'Каскелен, Абылай хана 1',
		isShowingModal: window.localStorage.getItem('new_computer'),
		order_ids: []
	}

	handleClose = () => {
		this.props.checkConnectivity.onlineCheck().then(() => {
			let {license_token, access_token, order_ids} = this.state
			this.setState({isShowingModal: false})
			window.localStorage.setItem('new_computer', false)
			this.props.bookRequest.setBookReserve(license_token, access_token, order_ids)	
		})
		.catch(() => {
			alert('Интернет не работает. Пожалуйста проверьте ваше соединение')
		})
	}

	setBookState = (id) => {
		let {order_ids} = this.state
		if (order_ids.includes(id)) { // is exist id in array ?
			let index = order_ids.indexOf(id);
			order_ids.splice(index, 1)
		}
		else {
			order_ids.push(id)
		}
		this.setState({ order_ids })
	}

	componentWillMount() {
		this.props.checkConnectivity.onlineCheck().then(() => {
			let {license_token, access_token} = this.state
			this.props.bookRequest.getOrderedBooks(license_token, access_token)
			.then(response => {
				try {
					let organization = response.data.organization
					this.setState({
						orders: response.data.orders,
						organization: organization.name,
						phone_number: organization.contact_phone_number,
						contact_email: organization.contact_email,
						address: organization.address
					})

				} catch(e) {
					console.log('Some error on promise getOrderedBooks')
				}
			})	
		})
		.catch(() => {
			alert('Интернет не работает. Пожалуйста проверьте ваше соединение')
		})
	}
	
    render() {
    	let {orders, organization, phone_number, contact_email, address, isShowingModal} = this.state
    	let showModal = (isShowingModal === 'true')
    	return (
    		<div>
            { showModal ? <ModalContainer>
            	<div className="container books-selector">
            		<div style={{display: 'flex'}}>
	            		<button type="button" 
	            				className="btn btn-default" 
	            				onClick={this.handleClose}>Сохранить отмеченные книги</button>
		            	<div 	className="col-md-8" 
		            		 	style={{display: 'block', position: 'absolute', right: '0', top: '-8px'}}>
			            	<div className="col-md-6" >
			            		<p>Организация: {organization}</p>
			            		<p>Адрес: {address}</p>
			            	</div>
			            	<div className="col-md-6">
			            		<p>Почта: {contact_email}</p>
			            		<p>Телефон: {phone_number}</p>
			            	</div>
		            	</div>
	            	</div>
            		<div className="books">
	            	
	            	{
	            		orders.map((value, index) => 
	            			<div className="col-sm-4 books__book" key={index}>
								<img src={ url_api + value.book.cover} alt="book" />
								<div className="books__book__wrap">
									<div className="books__book__wrap__text col-md-10">
										<p 	title={value.book.name} 
											className="books__book__name">{value.book.name}</p>
										<p 	title={value.book.author} 
											className="books__book__author">{value.book.author}</p>
									</div>
									<input 	className="simple-checkbox" 
											type="checkbox" 
											title="bookmark page"
											onChange={() => this.setBookState(value.id)}  />
								</div>
							</div>
						)
	            	}
					</div>
            	</div>
            </ModalContainer> : null}
            </div>
        )
    }
}

const mapStateToProps = state => ({
   	appStateControl: state.appStateControl
})

const mapDispatchToProps = dispatch => ({
    bookRequest: bindActionCreators(bookRequest, dispatch),
    checkConnectivity: bindActionCreators(checkConnectivity, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectorBooks)

