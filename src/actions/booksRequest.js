import * as types from '../constants/e_reader'
import axios from 'axios'
import { url as url_api, api_v1, api_v2 } from '../path.json'

let url = url_api
let api = api_v1, api2 = api_v2 

export function getAllBooks(license_token, access_token) {
	return dispatch => {
		axios({
			method: 'post',
			url: url + api + 'book',
			data: {
				'COMP_ACCESS_TOKEN': license_token 
			},
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + access_token
			}
		})
		.then(response => {
			console.log('getAllBooks', response)
			let all_books = response.data
			if (response.data.status === undefined) {

			} else {
				console.log('No books')
				all_books = []
			}
			
			dispatch({
				type: types.SET_MAIN_ALL_BOOKS,
				data: all_books
			})
			
			dispatch({
				type: types.SET_MAIN_HUMANITARIES_BOOKS,
				data: all_books.filter(object => object.category_id === 1)
			})
			
			dispatch({
				type: types.SET_MAIN_TECHNICAL_BOOKS,
				data: all_books.filter(object => object.category_id === 2)
			})
			
			dispatch({
				type: types.SET_MAIN_MEDICAL_BOOKS,
				data: all_books.filter(object => object.category_id === 3)
			})
		})
		.catch(error => {
			console.log(error)
		})
	}
}

export function getBookById(license_token, access_token, book_id) {
	return dispatch => {
		return axios({
			method: 'get',
			url: url + api + 'book/' + book_id,
			data: {
				'COMP_ACCESS_TOKEN': license_token
			},
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + access_token
			}
		})
		.then(response => {
			console.log('getBookById', response)
			return response.data
		})
		.catch(error => {
			console.log('getBookById', error)
		})
	}
}

export function getAllMyBooks(license_token, access_token) {
	return dispatch => {
		axios({
			method: 'post',
			url: url + api2 + 'user/favourite',
			data: {
				'COMP_ACCESS_TOKEN': license_token
			},
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + access_token
			}
		})
		.then(response => {
			console.log('getAllMyBooks', response)

			dispatch({
				type: types.SET_MY_ALL_BOOKS,
				data: response.data
			})

			dispatch({
				type: types.SET_MY_HUMANITARIES_BOOKS,
				data: response.data.filter(object => object.category_id === 1)
			})

			dispatch({
				type: types.SET_MY_TECHNICAL_BOOKS,
				data: response.data.filter(object => object.category_id === 2)
			})

			dispatch({
				type: types.SET_MY_MEDICAL_BOOKS,
				data: response.data.filter(object => object.category_id === 3)
			})

		})
		.catch(error => {
			console.log('getAllMyBooks', error)
		})
	}
}

export function addToFavouriteBooks(license_token, access_token, book_id, isFavourite) {
	return dispatch => {
		axios({
			method: 'post',
			url: url + api + 'user/favourite',
			data: {
				'COMP_ACCESS_TOKEN': license_token,
				'book_id': book_id,
				isFavourite: isFavourite
			},
			headers: {
				'Authorization': 'Bearer ' + access_token
			}
		})
		.then(response => {
			console.log('addToFavouriteBooks', response)

		})
		.catch(error => {
			console.log('addToFavouriteBooks', error)
		})
	}
}


export function sendBookDuration(license_token, access_token, book_id, duration) {
	return dispatch => {
		axios({
			method: 'post',
			url: url + api + 'user/book_duration',
			data: {
				'COMP_ACCESS_TOKEN': license_token,
				'book_id': book_id,
				'duration': Number(duration)
			},
			headers: {
				'Authorization': 'Bearer ' + access_token
			}
		})
		.then(response => {
			console.log('sendBookDuration', response)
		})
		.catch(error => {
			console.log('sendBookDuration', error)
		})
	}
}

export function getOrderedBooks(license_token, access_token) {
	return dispatch => {
		return axios({
			method: 'post',
			url: url + api + 'book_order',
			data: {
				COMP_ACCESS_TOKEN: license_token
			},
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + access_token 
			}
		})
		.then(response => {
			console.log('getOrderedBooks', response)
			return response
		})
		.catch(error => {
			console.log('getOrderedBooks', error)
		})
	}
}

export function setBookReserve(license_token, access_token, order_ids) {
	//console.log('order_ids', order_ids)
	return dispatch => {
		let data = {
			'COMP_ACCESS_TOKEN': license_token,
			order_ids
		}
		/*for (let i = 0; i <= order_ids.length-1; i++) {
			data['order_ids['+ i +']'] = order_ids[i]
		}*/
		//console.log('sended body data', data)
		axios({
			method: 'post',
			url: url + api + 'book_reserve',
			data: data,
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + access_token
			}
		})
		.then(response => {
			console.log('setBookReserve', response)
		})
		.catch(error => {
			console.log('setBookReserve', error)
		})
	}
}
