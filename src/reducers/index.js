import { combineReducers } from 'redux'
import book_test from './book_test'
import precis from './precis'
import main_book_item from './main_book_item'
import my_book_item from './my_book_item'
import books_progress from './books_progress'
import appStateControl from './appStateControl'
import auth from './auth'
import userData from './userData'
import book_video from './book_video'

const rootReducer = combineReducers({
 	book_test, 
 	precis, 
 	main_book_item, 
 	my_book_item, 
 	books_progress, 
 	appStateControl, 
 	auth, 
 	userData,
 	book_video
})
console.log("rootReducer on reducers/index.js reducer", rootReducer);

export default rootReducer
