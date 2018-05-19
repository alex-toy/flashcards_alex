import { combineReducers } from 'redux'
import resultreducer from './resultreducer'
import deckreducer from './deckreducer'


const rootReducer = combineReducers({
  resultreducer,
  deckreducer
})



export default rootReducer