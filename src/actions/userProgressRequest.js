import * as types from '../constants/e_reader'
import axios from 'axios'
import { url as url_api, api_v1, api_v2 } from '../path.json'

let url = url_api
let api = api_v1, api2 = api_v2

export function getAllUserProgress(license_token, access_token) {
	return dispatch => {
		return axios({
			method: 'post',
			url: url + api2 + 'user/progress',
			data: {
				'COMP_ACCESS_TOKEN': license_token
			},
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + access_token
			}
		})
		.then(response => {
			let color = "#3e76bd", highlight = "#bdd0e6"
			
			let progress = response.data.progress
			let exam_progress = response.data.exam_progress
			
			let book_page_count=0, readed_page_count=0, general_duration=0
			for (let i = progress.length - 1; i >= 0; i--) {
				book_page_count += progress[i].total_page //count of all book pages
				readed_page_count += progress[i].last_opened_page //count of readed book pages
				general_duration += progress[i].duration
			}
			
			let general_correct_answ=0, general_incorrect_answ=0
			for (let i = exam_progress.length - 1; i >= 0; i--) {
				general_correct_answ += exam_progress[i].correct_count
				general_incorrect_answ += exam_progress[i].incorrect_count
			}
			
			let general_progress = [
				   	[
				      {	
				      	key: Math.round((book_page_count / (book_page_count + readed_page_count)) * 100) + ' %',
				        value: book_page_count,
				        color: color
				      },
				      {
				      	key: Math.round((readed_page_count / (book_page_count + readed_page_count)) * 100) + ' %',
				        value: readed_page_count,
				        color: highlight
				      }
				    ],
				    [
				      {
				      	key: Math.round((general_correct_answ / (general_correct_answ + general_incorrect_answ)) * 100) + ' %',
				        value: general_correct_answ,
				        color: color
				      },
				      {
				      	key: Math.round((general_incorrect_answ / (general_correct_answ + general_incorrect_answ)) * 100) + ' %',
				        value: general_incorrect_answ,
				        color: highlight
				      }
				    ],
				    [
				      {
				      	value: Math.round(general_duration / 60),
				        color: color
				      }
				    ]
				]
				
			let readed_books = progress.filter(object => object.isReaded === 1)
			let opened_books = progress.filter(object => (object.isOpened === 1) && (object.isReaded === 0))
			
			let readed_book_progress = [],
			  	correct_count = [],
			  	incorrect_count = []
			for (let i = readed_books.length - 1; i >= 0; i--) {				
				correct_count = exam_progress.filter(object => object.book_id === readed_books[i].book_id)[0]
				incorrect_count = exam_progress.filter(object => object.book_id === readed_books[i].book_id)[0]
				let book_readed_progress = {
			      image: url + readed_books[i].book.cover,
			      name: readed_books[i].book.name,
			      author: readed_books[i].book.author, 
			      statistics: [
			        [
			          {
			            value: readed_books[i].total_page,
			            key: Math.round((readed_books[i].total_page / (readed_books[i].total_page + readed_books[i].last_opened_page)) * 100) + ' %',
			            color:color,
			          },
			          {
			            value: readed_books[i].last_opened_page,
			            key: Math.round((readed_books[i].last_opened_page / (readed_books[i].total_page + readed_books[i].last_opened_page)) * 100) + ' %',
			            color:highlight,
			          }
			        ],
			        [
			          {
			            value: (correct_count === undefined || correct_count === 0) ? 1 : correct_count.correct_count,
			            key: (correct_count === undefined || correct_count === 0) ? 1 : correct_count.correct_count,
			            color: color
			          },
			          {
			            value: (incorrect_count === undefined || incorrect_count === 0) ? 1 : incorrect_count.correct_count,
			            key: (incorrect_count === undefined || incorrect_count === 0) ? 1 : incorrect_count.correct_count,
			            color:highlight,
			          }
			        ],
			        [
			          {
			            value: Math.round(readed_books[i].duration / 60),
			            color:color
			          }
			        ]
			      ]
			    }
			    
			    readed_book_progress.push(book_readed_progress)
			}

			let iread_book_progress = []
			for (let j = opened_books.length - 1; j >= 0; j--) {
				correct_count = exam_progress.filter(object => object.book_id === opened_books[j].book_id)[0]
				incorrect_count = exam_progress.filter(object => object.book_id === opened_books[j].book_id)[0]
				let book_iread_progress = {
			      image: url + opened_books[j].book.cover,
			      name: opened_books[j].book.name,
			      author: opened_books[j].book.author, 
			      statistics: [
			        [
			          {
			            value: opened_books[j].total_page,
			            color:color,
			            key: opened_books[j].total_page
			          },
			          {
			            value: opened_books[j].last_opened_page,
			            color:highlight,
			            key: opened_books[j].last_opened_page
			          }
			        ],
			        [
			          {
			            value: (correct_count === undefined || correct_count === 0) ? 1 : correct_count.correct_count,
			            color:color,
			            key: (correct_count === undefined || correct_count === 0) ? 1 : correct_count.correct_count
			          },
			          {
			            value: (incorrect_count === undefined || incorrect_count === 0) ? 1 : incorrect_count.correct_count,
			            color:highlight,
			            key: (incorrect_count === undefined || incorrect_count === 0) ? 1 : incorrect_count.correct_count,
			          }
			        ],
			        [
			          {
			            value: Math.round(opened_books[j].duration / 60),
			            color:color 
			          }
			        ]
			      ]
			    }
			    
			    iread_book_progress.push(book_iread_progress)
			}
			
			dispatch({
				type: types.GET_GENERAL_PROGRESS,
				general_progress
			})
			dispatch({
				type: types.GET_READED_PROGRESS,
				readed_book_progress
			})

			dispatch({
				type: types.GET_IREAD_PROGRESS,
				iread_book_progress
			})

			return general_progress
		})
		.catch(error => {
			console.log('getAllUserProgress', error)
		})
	}
}

/*where is the user id*/
/*what if i want to send isOpened and isReaded in one time?*/
export function bookIsOpened(license_token, access_token, book_id) {
	return dispatch => {
		axios({
			method: 'post',
			url: url+api+'user/progress',
			data: {
				book_id: book_id,
				key: 'isOpened',
				COMP_ACCESS_TOKEN: license_token,
			},
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + access_token
			}
		})
		.then(response => {
			//return response
		})
		.catch(error => {
			console.log('bookIsOpened', error)
		})

	}
}

export function bookIsReaded(license_token, access_token, book_id) {
	return dispatch => {
		axios({
			method: 'post',
			url: url+api+'user/progress',
			data: {
				book_id: book_id,
				key: 'isReaded',
				COMP_ACCESS_TOKEN: license_token,
			},
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + access_token
			}
		})
		.then(response => {
		})
		.catch(error => {
			console.log('bookIsReaded', error)
		})
	}
}

export function setLastOpenedPage(license_token, access_token, book_id, last_opened_page) {
	return dispatch => {
		axios({
			method: 'post',
			url: url + api + 'user/progress',
			data: {
				book_id: book_id,
				key: 'last_opened_page',
				last_opened_page: last_opened_page
			},
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + access_token	
			}
		})
		.then(response => {
		})
		.catch(error => {
			console.log('setLastOpenedPage', error)
		})
	}
}