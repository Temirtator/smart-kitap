import * as types from '../constants/e_reader'
import axios from 'axios'
import ReactGA from 'react-ga';
let url = 'http://smartkitap.avsoft.kz'
let api = '/api/v1/'
/*'0000-0000-0000-0003'*/
export function activation(serial_code) {
	return dispatch => {
		return axios({
			method: 'post',
			url: url + api + 'credentials',
			data: {
				serial_code: serial_code,
				technical_computer_info: 'whfnwekjfwenfj',
				mac_address: window.serial_number!==undefined?window.serial_number:'TEST_TEST_2'
			},
			headers: {
				'Content-Type': 'application/json'
			}
		})
		.then(response => {
            ReactGA.event({
                category: 'Приложение',
                action: 'Проверка ключа'
            });
			console.log(response)
			return response
		})
		.catch(error => {
			console.log(error)

		})
	}
}

export function checkActivation(license_token) {
	//console.log('license_token', license_token)
	return dispatch => {
		return axios({
			method: 'post',
			url: url + api + 'credentials/check',
			data: {
				COMP_ACCESS_TOKEN: license_token
			},
			headers: {
				'Content-Type': 'application/json'
			}
		})
		.then(response => {
			console.log(response)
			return response.data
		})
		.catch(error => {
			console.log(error)

		})
	}
}