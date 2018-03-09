import {  CHANGE_NEW_PRECIS, 
          CHANGE_OLD_PRECIS,
          SET_NEW_BOOK_PRECIS,
          SET_OLD_BOOK_PRECIS,
          SET_BOOK_INFO } from '../constants/e_reader'

const initialPrecises = {
	precises: {
        name: '',
        author: '',
        img: '',
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
      let oldPrecises = state.precises
      oldPrecises.old_precises[action.position].precise = action.oldPrecis
      return { precises: oldPrecises }

    case SET_NEW_BOOK_PRECIS:
      let newBookPrecises = state.precises
      newBookPrecises.new_precises.push(action.newBookPrecis)
      return { precises: newBookPrecises }

    case SET_OLD_BOOK_PRECIS:
      let oldBookPrecises = state.precises
      oldBookPrecises.old_precises.push(action.oldBookPrecis)
      return { precises: oldBookPrecises }

    case SET_BOOK_INFO:
      let curState = state.precises
      let {name, author, img} = action.bookInfo
      curState.name = name
      curState.author = author
      curState.img = img
      return 
      
    default:
      return state
  }
}

