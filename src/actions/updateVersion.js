import * as types from '../constants/e_reader'
import axios from 'axios'

let url = 'http://smartkitap.avsoft.kz'
let api = '/api/v1/'

export function checkVersion(version) {
	return dispatch => {
		return axios({
			method: 'post',
			url: url + api + 'app_version',
			data: {},
			headers: {
				'Content-Type': 'application/json'
			}
		})
		.then(response => {
			console.log('checkVersion', response)
			return response
		})
		.catch(error => {
			console.log('checkVersion', error)
		})
	}
}
