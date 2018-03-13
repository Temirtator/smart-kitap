import {  CHANGE_NEW_PRECIS, 
          CHANGE_OLD_PRECIS,
          SET_NEW_BOOK_PRECIS,
          SET_OLD_BOOK_PRECIS,
          SET_BOOK_INFO,
          GET_USER_OLD_PRECIS } from '../constants/e_reader'

const initialPrecises = {
	precises: {
        new_precises: [
          
        ],

        old_precises: [
          
        ]
      }
  }

export default function precis(state = initialPrecises, action) {

  switch (action.type) {
  	case CHANGE_NEW_PRECIS:
      let newPrecises = state.precises
      for (let i = 0; i <= newPrecises.new_precises.length-1; i++) {
        //console.log(action.newPrecis.book_id, '===', newPrecises.new_precises[i].book_id)
        if (Number(action.newPrecis.book_id) === Number(newPrecises.new_precises[i].book_id)) {
          newPrecises.new_precises[i] = action.newPrecis
          break
        }
        else {
          //newPrecises.new_precises.push(action.newPrecis)
        }
      }
      return { precises: newPrecises }
      
    case CHANGE_OLD_PRECIS:
      let precises = state.precises
      precises.old_precises = action.oldPrecis
      return { precises: precises }

    case SET_NEW_BOOK_PRECIS:
      let newBookPrecises = state.precises
      newBookPrecises.new_precises.push(action.newBookPrecis)
      return { precises: newBookPrecises }

    case SET_OLD_BOOK_PRECIS:
      let oldBookPrecises = state.precises
      oldBookPrecises.old_precises.push(action.oldBookPrecis)
      return { precises: oldBookPrecises }

    case GET_USER_OLD_PRECIS:
      let precises1 = state.precises
      precises1.old_precises = action.someArray
      return { precises: precises1 } 
      
    default:
      return state
  }
}

