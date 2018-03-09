import * as types from '../constants/e_reader'
import axios from 'axios'

let url = 'http://smartkitap.avsoft.kz'
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

export function changeOldPrecis(position, oldPrecis) {
	return dispatch => {
		dispatch({
			type: types.CHANGE_OLD_PRECIS,
			position,
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

//most ugly function i ever wrote maybe
export function getUserPrecis(token, book_id) {
	return dispatch => {
		return axios({
			method: 'get',
			url: url+api+'precis',
			data: {},
			headers: {
				'Authorization': 'Bearer ' + token
			}
		})
		.then(response => {
			let object = {
				book_id: book_id,
				precise: []
			}
			
			for (let i = 0; i <= response.data.length-1; i++) {
				//console.log(response.data[i].book_id, '===', book_id)
				if (response.data[i].book_id === Number(book_id)) {
					object.precise.push({
						precis: response.data[i].text, 
						yPos: 2500
					})
				}
			}
			
			let bookInfo = {}
			for (var i = response.data.length - 1; i >= 0; i--) {
				if (response.data[i].book_id === Number(book_id)) {
					let {name,author,cover} = response.data[i].book
					bookInfo.name = name
					bookInfo.author = author
					bookInfo.img = cover
					break
				}
			}

			dispatch({
				type: types.CHANGE_NEW_PRECIS,
				newPrecis: object
			})
			if (bookInfo) {
				dispatch({
					type: types.SET_BOOK_INFO,
					bookInfo
				})	
			}
			
		})
		.catch(error => {
			console.log(error)
		})
	}
}