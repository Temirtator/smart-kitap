import {  SET_MAIN_ALL_BOOKS,
          SET_MAIN_HUMANITARIES_BOOKS,
          SET_MAIN_TECHNICAL_BOOKS,
          SET_MAIN_MEDICAL_BOOKS } from '../constants/e_reader'

const initialBookState = {
  all_books: [
    
  ],
  humanitarian_books: [
  
  ],
  technical_books: [
   
  ],
  medical_books: [
  ]
}
	
export default function main_book_item(state = initialBookState, action) {

  switch (action.type) {

    case SET_MAIN_ALL_BOOKS:
      return {...state, all_books: action.data }

    case SET_MAIN_HUMANITARIES_BOOKS:
      return {...state, humanitarian_books: action.data}

    case SET_MAIN_TECHNICAL_BOOKS:
      return {...state, technical_books: action.data}
      
    case SET_MAIN_MEDICAL_BOOKS:
      return {...state, medical_books: action.data}
    
    default:
      return state
  }
}

