import * as types from '../constants/e_reader'
import axios from 'axios'

let url = 'http://smart-kitap.kz'
let api = '/api/v1/'

export function getUserInfo(token) {
	return dispatch => {
		axios({
			method: 'post',
			url: url + api + 'user/me',
			data: {},
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + token
			}
		})
		.then(response => {
			console.log(response, 'getUserData')
			dispatch({
				type: types.SET_USER_DATA,
				data: response.data
			})
			
		})
		.catch(error => {
			return error
		})
	}
}