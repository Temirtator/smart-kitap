import * as types from '../constants/e_reader'
import axios from 'axios'
import { url as url_api, api_v1, api_v2 } from '../path.json'

let url = url_api
let api = api_v1, api2 = api_v2

export function getAllBooks(license_token, access_token) {
	return dispatch => {
		const fakeData = {
			data: [
				{
					category_id: 1
				},
				{
					category_id: 2
				},
				{
					category_id: 3
				}
			]
		}
		// axios({
		// 	method: 'post',
		// 	url: url + api + 'book',
		// 	data: {
		// 		'COMP_ACCESS_TOKEN': license_token 
		// 	},
		// 	headers: {
		// 		'Content-Type': 'application/json',
		// 		'Authorization': 'Bearer ' + access_token
		// 	}
		// })
		// .then(response => {
			let all_books = fakeData.data
		// 	if (response.data.status === undefined) {

		// 	} else {
		// 		all_books = []
		// 	}
			
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
		// })
		// .catch(error => {
		// 	console.log(error)
		// })
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
			console.log(response)
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
			// return response
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
			// return response
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
			return response
		})
		.catch(error => {
			console.log('getOrderedBooks', error)
		})
	}
}

export function setBookReserve(license_token, access_token, order_ids) {
	return dispatch => {
		let data = {
			'COMP_ACCESS_TOKEN': license_token,
			order_ids
		}
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
			// return response
		})
		.catch(error => {
			console.log('setBookReserve', error)
		})
	}
}

export function getEncryptedBook(license_token, access_token, book_id) {
	return dispatch => {
		return axios({
			method: 'post',
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
			return response.data
		})
		.catch(error => {
			console.log('getEncryptedBook', error)
		})
	}
}