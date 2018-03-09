import { LOAD_BOOK_VIDEO } from '../constants/e_reader'

const initialState = [

]


export default function book_video(state = initialState, action) {
  
  switch (action.type) {
  	
    case LOAD_BOOK_VIDEO:
      return action.videoLectures

    default:
      return state
  }
}