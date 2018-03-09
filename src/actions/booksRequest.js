import * as types from '../constants/e_reader'
import axios from 'axios'

let url = 'http://smartkitap.avsoft.kz'
let api = '/api/v1/'

export function getAllBooks(license_token, access_token) {
	return dispatch => {
		axios({
			method: 'post',
			url: url+api+'book',
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

			dispatch({
				type: types.SET_MAIN_ALL_BOOKS,
				data: response.data
			})
			
			dispatch({
				type: types.SET_MAIN_HUMANITARIES_BOOKS,
				data: response.data.filter(object => object.category_id === 1)
			})
			
			dispatch({
				type: types.SET_MAIN_TECHNICAL_BOOKS,
				data: response.data.filter(object => object.category_id === 2)
			})
			
			dispatch({
				type: types.SET_MAIN_MEDICAL_BOOKS,
				data: response.data.filter(object => object.category_id === 3)
			})
		})
		.catch(error => {
			console.log(error)
		})
	}
}

export function getBookById(access_token, book_id) {
	return dispatch => {
		return axios({
			method: 'get',
			url: url+api+'book/' + book_id,
			data: {},
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
			method: 'get',
			url: url+api+'user/favourite',
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
				//'COMP_ACCESS_TOKEN': license_token,
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