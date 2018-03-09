import { SET_USER_TOKEN } from '../constants/e_reader'

const initialPrecises = {
  auth_token: null
}

export default function auth(state = initialPrecises, action) {

  switch (action.type) {
  	case SET_USER_TOKEN:
      return {...state, auth_token: action.token}
      
    default:
      return state
  }
}

