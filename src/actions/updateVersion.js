import * as types from '../constants/e_reader'
import axios from 'axios'
import { url as url_api, api_v1 } from '../path.json'

let url = url_api
let api = api_v1

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
			return response
		})
		.catch(error => {
			console.log('checkVersion', error)
		})
	}
}
