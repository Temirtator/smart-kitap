import {  CHANGE_BLIND_MODE, 
          SAVE_USER_SETTINGS, 
          SAVE_THEME_SETTINGS, 
          SET_BOOK_SCROLL,
          SAVE_OPENED_BOOK_ID,
          SET_BOOK_CATEGORY,
          SET_BOOK_MENU,
          SET_SEARCH_BOOK,
          SET_FILTERED_BOOKS } from '../constants/e_reader'

const initialPrecises = {
	blindMode: false,
	user_settings: {
		nameStore: 'Dilnaz',
		surnameStore: 'Abdullaeva',
		emailStore: 'd.abdullaeva@mail.ru',
		passwordStore: 'password',
		repeat_passwordStore: 'password',
		language: 0
	},
	theme_settings: {
		theme: 0,
		isTurnOn: false
	},
  openedBookId: null,
  book_page_id: 0,
  opened_book_category: null,
  opened_book_menu: null,
  searchBookText: '',
  filteredBooks: []
}

export default function appStateControl(state = initialPrecises, action) {

  switch (action.type) {
  	case CHANGE_BLIND_MODE:
  		return {...state, blindMode: !state.blindMode}

    case SAVE_USER_SETTINGS:
    	let user_settings = state.user_settings
    	user_settings.nameStore = action.name
    	user_settings.surnameStore = action.surname
    	user_settings.emailStore = action.email
    	user_settings.passwordStore = action.password
    	user_settings.repeat_passwordStore = action.repeat_password
    	user_settings.language = action.app_lang
    	return {...state, user_settings: user_settings}

    case SAVE_THEME_SETTINGS:
    	let theme_settings = state.theme_settings
    	theme_settings.theme = action.app_theme
    	theme_settings.isTurnOn = action.isTurnOn
    	return { ...state, theme_settings: theme_settings }

    case SET_BOOK_SCROLL:
      return {...state, book_page_id: action.book_page_id}

    case SAVE_OPENED_BOOK_ID:
      return {...state, openedBookId: action.book_id}

    case SET_BOOK_CATEGORY:
      return {...state, opened_book_category: action.category}

    case SET_BOOK_MENU:
      return {...state, opened_book_menu: action.menu}

    case SET_SEARCH_BOOK:
      return {...state, searchBookText: action.text}

    case SET_FILTERED_BOOKS:
      return {...state, filteredBooks: action.filteredBooks}
      
    default:
      return state
  }
}

