import * as types from '../constants/e_reader'
import axios from 'axios'

let url = 'http://smart-kitap.kz'
let api = '/api/v1/'

export function changeNewPrecis(position, newPrecis) {
	return dispatch => {
		dispatch({
			type: types.CHANGE_NEW_PRECIS,
			position,
			newPrecis
		})
	}
}

export function changeOldPrecis(oldPrecis) {
	return dispatch => {
		dispatch({
			type: types.CHANGE_OLD_PRECIS,
			oldPrecis
		})
	}
}

export function setNewBookPrecis(newBookPrecis) {
	return dispatch	=> {
		dispatch({
			type: types.SET_NEW_BOOK_PRECIS,
			newBookPrecis
		})
	}
}

export function setOldBookPrecis(oldBookPrecis) {
	return dispatch	=> {
		dispatch({
			type: types.SET_OLD_BOOK_PRECIS,
			oldBookPrecis
		})
	}
}

export function getUserOldPrecis(someArray) {
	return dispatch => {
		dispatch({
			type: types.GET_USER_OLD_PRECIS,
			someArray
		})
	}
}

//most ugly function i ever wrote maybe
export function getUserPrecis(license_token, access_token, book_id) {
	return dispatch => {
		return axios({
			method: 'get',
			url: url + api + 'precis',
			data: {
				COMP_ACCESS_TOKEN: license_token
			},
			headers: {
				'Authorization': 'Bearer ' + access_token
			}
		})
		.then(response => {
			console.log('getUserPrecis', response)
			let object = {
				book_id: book_id,
				precise: []
			}
			
			for (let i = 0; i <= response.data.length-1; i++) {
				//console.log(response.data[i].book_id, '===', book_id)
				if (response.data[i].book_id === Number(book_id)) {
					object.precise.push({
						precis: response.data[i].text, 
						book_page_id: response.data[i].book_page_id,
						precis_id: response.data[i].id,
						created_at: response.data[i].created_at
					})
				}
			}
			
			/*let bookInfo = {}
			for (var i = response.data.length - 1; i >= 0; i--) {
				if (response.data[i].book_id === Number(book_id)) {
					let {name,author,cover} = response.data[i].book
					bookInfo.name = name
					bookInfo.author = author
					bookInfo.img = cover
					break
				}
			}*/
			
			dispatch({
				type: types.CHANGE_NEW_PRECIS,
				newPrecis: object
			})
			
			/*if (bookInfo) {
				dispatch({
					type: types.SET_BOOK_INFO,
					bookInfo
				})	
			}*/
			
		})
		.catch(error => {
			console.log(error)
		})
	}
}

export function addBookPrecis(access_token, book_id, book_page_id, text) {
	return dispatch => {
		return axios({
			method: 'put',
			url: url + api + 'precis',
			data: {
				book_id: book_id,
				book_page_id: book_page_id,
				text: text
			},
			headers: {
				Authorization: 'Bearer ' + access_token,
				'Content-Type': 'application/json'
			}
		})
		.then(response => {
			console.log('addBookPrecis', response)
			
		})
		.catch(error => {
			console.log('addBookPrecis', error)
		})
	}
}

export function clearBookPrecis(access_token, license_token, precise_id) {
	return dispatch => {
		return axios({
			method: 'delete',
			url: url + api + 'precis',
			data: {
				concept_id: precise_id
			},
			headers: {
				Authorization: 'Bearer ' + access_token,
				'Content-Type': 'application/json'
			}
		})
		.then(response => {
			console.log('clearBookPrecis', response)
			
		})
		.catch(error => {
			console.log('clearBookPrecis', error)
		})
	}	
}