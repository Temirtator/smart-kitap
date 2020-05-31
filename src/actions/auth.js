// import * as types from '../constants/e_reader'
import axios from 'axios'
// import * as checkConnectivity from './checkConnectivity'
import { url as url_api, api_v1 } from '../path.json'

let url = url_api
let api = api_v1

export function login(email, password) {
	return dispatch => {
		return axios({
			method: 'post',
			url: url + api + 'user/login',
			data: {
				email: email,
				password: password
			},
			headers: {
				'Content-Type': 'application/json'
			}
		})
		.then(response => {
			return response
		})
		.catch(error => {
			return error
		})
	}
}

export function forgotPassword(email) {
	return dispatch => {
		return axios({
			method: 'post',
			url: url + api + 'user/recovery',
			data: {
				email: email,
			},
			headers: {
				'Content-Type': 'application/json'
			}
		})
		.then(response => {
			return response
		})
		.catch(error => {
			console.log('forgotPassword', error)
		})
	}
}

export function registration(first_name, last_name, email, password, license_token) {
	return dispatch => {
		return axios({
			method: 'post',
			url: url + api + 'user/register',
			data: {
				first_name: first_name,
				last_name: last_name,
				email: email,
				password: password,
				COMP_ACCESS_TOKEN: license_token // here some bug
			},
			headers: {
				'Content-Type': 'application/json'
			}
		})
		.then(response => {
			return response
		})
		.catch(error => {
			console.log('registration', error)
		})
	}
}

export function editPassword(license_token, access_token, password) {
	return dispatch => {
		axios({
			method: 'post',
			url: url+api + 'user/change_password',
			data: {
				new_password: password,
				COMP_ACCESS_TOKEN: license_token
			},
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + access_token	
			}
		})
		.then(response => {
			// return response
		})
		.catch(error => {
			console.log('editPassword', error)
		})
	}
}

export function	editUserInfo(license_token, access_token, name, surname) {
	return dispatch => {
		axios({
			method: 'post',
			url: url + api + 'user',
			data: {
				COMP_ACCESS_TOKEN: license_token,
				first_name: name,
				last_name: surname
			},
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + access_token
			}
		})
		.then(response => {
			// return response
		})
		.catch(error => {
			console.log('editUserInfo', error)
		})
	}
}