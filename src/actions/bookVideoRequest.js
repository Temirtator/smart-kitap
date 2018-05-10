import * as types from '../constants/e_reader'
import axios from 'axios'
import { url as url_api, api_v1 } from '../path.json'

let url = url_api
let api = api_v1

export function getVideoLectures(license_token, access_token, book_id) {
	return dispatch => {
		return axios({
			method: 'get',
			url: url + api + 'book/video_lecture/' + book_id,
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
				type: types.LOAD_BOOK_VIDEO,
				videoLectures: response.data
			})
			return response
		})
		.catch(error => {
			console.log('getVideoLectures', error)
		})
	}
}