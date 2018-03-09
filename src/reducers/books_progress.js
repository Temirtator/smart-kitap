import {  GET_GENERAL_PROGRESS,
          GET_READED_PROGRESS,
          GET_IREAD_PROGRESS } from '../constants/e_reader'

const initialBookState = {
  general: [],
  readed: [],
  i_read: []
}
	
export default function books_progress(state = initialBookState, action) {

  switch (action.type) {
  	
    case GET_GENERAL_PROGRESS:
      return {...state, general: action.general_progress}

    case GET_READED_PROGRESS:
      return {...state, readed: action.readed_book_progress}

    case GET_IREAD_PROGRESS:
      return {...state, i_read: action.iread_book_progress}

    default:
      return state
  }
}

