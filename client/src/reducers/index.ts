import { combineReducers } from 'redux'
import userReducer from './user'
import fileReducer from './file'

const rootReducer = combineReducers({
  user: userReducer,
  file: fileReducer,
})

export default rootReducer