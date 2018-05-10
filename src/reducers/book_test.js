import { 	SELECTED_QUESTION,
			GET_TEST_QUESTIONS,
			SET_ANSWER,
			SET_TEST_FINISHED,
      SET_TEST_STARTED } from '../constants/e_reader'

const initialState = {
  	questions: [],
	answers: [],
	testIsFinished: false
}


export default function book_test(state = initialState, action) {
  
  switch (action.type) {
  	case SELECTED_QUESTION:
  		return { ...state, test_question_paginate: action.page}

  	case GET_TEST_QUESTIONS:
  		return {...state, questions: action.questions}
  		
  	case SET_ANSWER:
      return {...state, answers: action.answers}

  	case SET_TEST_FINISHED:
  		return {...state, testIsFinished: true}

    case SET_TEST_STARTED:
      return {...state, testIsFinished: false, answers: [], questions: []}

    default:
      return state
  }
}