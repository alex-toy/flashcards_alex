import { combineReducers } from 'redux'
import resultreducer from './resultreducer'
import deckreducer from './deckreducer'
import userreducer from './userreducer'


const rootReducer = combineReducers({
  resultreducer,
  deckreducer,
  userreducer
})



export default rootReducer