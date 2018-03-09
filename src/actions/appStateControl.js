import * as types from '../constants/e_reader'

export function changeBlindMode() {
	return dispatch => {
		dispatch({
			type: types.CHANGE_BLIND_MODE
		})
	}
}


export function saveUserSettings(name, surname, email, password, repeat_password, app_lang) {
	return dispatch => {
		dispatch({
			type: types.SAVE_USER_SETTINGS,
			name: name,
			surname: surname,
			email: email,
			password: password,
			repeat_password: repeat_password,
			app_lang: app_lang
		})
	}
}

export function saveAppTheme(isTurnOn, app_theme) {
	return dispatch => {
		dispatch({
			type: types.SAVE_THEME_SETTINGS,
			isTurnOn: isTurnOn,
			app_theme: app_theme
		})
	}
}

export function setBookScrollPos(yPos) {
	return dispatch => {
		dispatch({
			type: types.SET_BOOK_SCROLL,
			yPos: yPos
		})
	}
}

export function setBookCategory(book_category) {
	return dispatch => {
		dispatch({
			type: types.SET_BOOK_CATEGORY,
			category: book_category
		})
	}
}

export function setBookMenu(book_menu) {
	return dispatch => {
		dispatch({
			type: types.SET_BOOK_MENU,
			menu: book_menu
		})
	}
}

export function setSearchBook(text) {
	return dispatch => {
		dispatch({
			type: types.SET_SEARCH_BOOK,
			text
		})
	}
}

export function setFilteredBooks(filteredBooks) {
	return dispatch => {
		dispatch({
			type: types.SET_FILTERED_BOOKS,
			filteredBooks
		})
	}
} 