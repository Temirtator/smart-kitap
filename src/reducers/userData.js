import { SET_USER_DATA } from '../constants/e_reader'

const initialPrecises = {
}

export default function userData(state = initialPrecises, action) {

  switch (action.type) {
  	case SET_USER_DATA:
  		return action.data
      
    default:
		return state
  }
}

