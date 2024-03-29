import * as types from '../constants/e_reader'
import axios from 'axios'
import { url as url_api, api_v1 } from '../path.json'

let url = url_api
let api = api_v1

/* here in index js wroted all book tests requests  */
// it was accidentally, :))
export function setSelectedQuestion(page) {
	return dispatch => {
		dispatch({
			type: types.SELECTED_QUESTION,
			page: page
		})
	}
}

export function setSelectedAnswer(answer) {
	return dispatch => {
		dispatch({
			type: types.SELECTED_ANSWER,
			answer: answer
		})
	}
}


export function saveOpenedBookId(book_id) {
	return dispatch => {
		dispatch({
			type: types.SAVE_OPENED_BOOK_ID,
			book_id: book_id
		})
	}
}

export function getAllExamByBookId(license_token, access_token, book_id) {
	return dispatch => {
		return axios({
			method: 'get',
			url: url + api + 'exam/' + book_id,
			data: {
				COMP_ACCESS_TOKEN: license_token
			},
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + access_token
			}
		})
		.then(response => {
			return response.data
		})
		.catch(error => {
			console.log('getAllExamByBookId', error)
		})
	}
}

export function getTestQuestions(license_token, access_token, book_id, exam_id) {
	return dispatch => {
		return axios({
			method: 'get',
			url: url + api + 'exam/' + book_id + '/' + exam_id,
			data: {
				COMP_ACCESS_TOKEN: license_token
			},
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + access_token
			}
		})
		.then(response => {
			dispatch({
				type: types.GET_TEST_QUESTIONS,
				questions: response.data
			})
			return response
		})
		.catch(error => {
			console.log('getTestQuestions', error)
			return error
		})
	}
}

export function setTestResults(license_token, access_token, book_id, exam_id, correct_answers, incorrect_answers) {
	return dispatch => {
		axios({
			method: 'post',
			url: url + api + 'exam/' + book_id + '/' + exam_id,
			data: {
				COMP_ACCESS_TOKEN: license_token,
				correct_count: correct_answers,
				incorrect_count: incorrect_answers
			},
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + access_token
			}
		})	
		.then(response => {
			/*dispatch({
				type: types.SET_TEST_RESULTS,
				questions: response.data
			})*/
		})
		.catch(error => {
			console.log('setTestResults', error)
			if (error.response && error.response.data) {
                window.localStorage.setItem("ERROR_PAGE", error.response.data)
            }
		})
	}
}

export function setAnswer(answers) {
	return dispatch => {
		dispatch({
			type: types.SET_ANSWER,
			answers
		})
	}
}

export function setTestFinished() {
	return dispatch => {
		dispatch({
			type: types.SET_TEST_FINISHED,
		})
	}
}

export function setTestStarted() {
	return dispatch => {
		dispatch({
			type: types.SET_TEST_STARTED
		})
	}
}