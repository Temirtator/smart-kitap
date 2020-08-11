// import * as types from '../constants/e_reader'
import axios from 'axios'
import ReactGA from 'react-ga';
import { url as url_api, api_v1 } from '../path.json'

let url = url_api
let api = api_v1
/*'0000-0000-0000-0003'*/
export function activation(serial_code) {
	return dispatch => {
		const fakeResp = {
			data: {
				msg: "Ключ правильный",
				status: 200,
				data: {
					access_token: "access_token",
					is_new_computer: true,
					history: {
						id: 'id'
					}
				},
			}
		}
		return Promise.resolve(fakeResp);
		// return axios({
		// 	method: 'post',
		// 	url: url + api + 'credentials',
		// 	data: {
		// 		serial_code: serial_code,
		// 		technical_computer_info: window.system_info!==undefined?window.system_info+window.wan_interface: 'TEST',
		// 		mac_address: window.serial_number!==undefined?window.serial_number:'TEST_TEST_16'
		// 	},
		// 	headers: {
		// 		'Content-Type': 'application/json'
		// 	}
		// })
		// .then(response => {
    //         ReactGA.event({
    //             category: 'Приложение',
    //             action: 'Проверка ключа'
    //         })
		// 	return response
		// })
		// .catch(error => {
		// 	console.log(error)
		// })
	}
}

export function checkActivation(license_token) {
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
			return response.data
		})
		.catch(error => {
			console.log(error)
		})
	}
}