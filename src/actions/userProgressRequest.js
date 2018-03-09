import * as types from '../constants/e_reader'
import axios from 'axios'

let url = 'http://smartkitap.avsoft.kz'
let api = '/api/v1/'

export function getAllUserProgress(license_token, access_token) {
	return dispatch => {
		return axios({
			method: 'get',
			url: url+api+'user/progress',
			data: {
				'COMP_ACCESS_TOKEN': license_token
			},
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + access_token
			}
		})
		.then(response => {
			console.log('getAllUserProgress', response)
			let color = "#3e76bd", highlight = "#bdd0e6"

			let progress = response.data.progress
			let exam_progress = response.data.exam_progress

			let book_page_count=0, readed_page_count=0, general_duration=0
			for (let i = progress.length - 1; i >= 0; i--) {
				book_page_count += progress[i].book.page_count //count of all book pages
				readed_page_count += progress[i].last_opened_page_id //count of readed book pages
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
				        value: book_page_count,
				        color: color,
				        highlight: color
				      },
				      {
				        value: readed_page_count,
				        color: highlight,
				        highlight: highlight
				      }
				    ],
				    [
				      {
				        value: general_correct_answ,
				        color: color,
				        highlight: color
				      },
				      {
				        value: general_incorrect_answ,
				        color: highlight,
				        highlight: highlight
				      }
				    ],
				    [
				      {
				        value: Math.round(general_duration / 60),
				        color: color,
				        highlight: color
				      }
				    ]
				]

			let readed_books = progress.filter(object => object.isReaded === 1)
			let opened_books = progress.filter(object => (object.isOpened === 1) && (object.isReaded === 0))
			
			let readed_book_progress = [],
			  	correct_count = [],
			  	incorrect_count = []
			for (let i = readed_books.length - 1; i >= 0; i--) {
				correct_count = exam_progress.filter(object => object.book_id === readed_books[i].book_id)[0].correct_count
				incorrect_count = exam_progress.filter(object => object.book_id === readed_books[i].book_id)[0].incorrect_count
				
				let book_readed_progress = {
			      image: './image/harry_potter.jpg',
			      name: 'Гарри Поттер и Узник Азкабана',
			      author: 'Джоан Роулинг', 
			      statistics: [
			        [
			          {
			            value: readed_books[i].book.page_count,
			            color:color,
			            highlight: color
			          },
			          {
			            value: readed_books[i].last_opened_page_id,
			            color:highlight,
			            highlight:highlight
			          }
			        ],
			        [
			          {
			            value: (correct_count === undefined) ? 0 : correct_count,
			            color:color,
			            highlight:color
			          },
			          {
			            value: (incorrect_count === undefined) ? 0 : incorrect_count,
			            color:highlight,
			            highlight:highlight
			          }
			        ],
			        [
			          {
			            value: Math.round(readed_books[i].duration / 60),
			            color:color,
			            highlight:color
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
				console.log('correct_count', correct_count)
				let book_iread_progress = {
			      image: './image/harry_potter.jpg',
			      name: 'Гарри Поттер и Узник Азкабана',
			      author: 'Джоан Роулинг', 
			      statistics: [
			        [
			          {
			            value: opened_books[j].book.page_count,
			            color:color,
			            highlight: color
			          },
			          {
			            value: opened_books[j].last_opened_page_id,
			            color:highlight,
			            highlight:highlight
			          }
			        ],
			        [
			          {
			            value: (correct_count === undefined) ? 0 : correct_count,
			            color:color,
			            highlight:color
			          },
			          {
			            value: (incorrect_count === undefined) ? 0 : incorrect_count,
			            color:highlight,
			            highlight:highlight
			          }
			        ],
			        [
			          {
			            value: Math.round(opened_books[j].duration / 60),
			            color:color,
			            highlight:color
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
export function setUserProgress(license_token, access_token, book_id, isFavourite, key) {
	return dispatch => {
		axios({
			method: 'post',
			url: url+api+'user/progress',
			data: {
				book_id: book_id,
				isFavourite: isFavourite,
				key: key,
				COMP_ACCESS_TOKEN: license_token,
			},
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + access_token
			}
		})
		.then(response => {
			console.log('setUserProgress', response)

			//return response
		})
		.catch(error => {
			console.log('setUserProgress', error)
		})

	}
}

