import {  SET_MY_ALL_BOOKS,
          SET_MY_HUMANITARIES_BOOKS,
          SET_MY_TECHNICAL_BOOKS,
          SET_MY_MEDICAL_BOOKS } from '../constants/e_reader'

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

export default function my_book_item(state = initialBookState, action) {

  switch (action.type) {
    case SET_MY_ALL_BOOKS:
      return {...state, all_books: action.data }

    case SET_MY_HUMANITARIES_BOOKS:
      return {...state, humanitarian_books: action.data}

    case SET_MY_TECHNICAL_BOOKS:
      return {...state, technical_books: action.data}

    case SET_MY_MEDICAL_BOOKS:
      return {...state, medical_books: action.data}
      
    default:
      return state
  }
}

