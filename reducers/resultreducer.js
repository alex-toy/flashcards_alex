import { FETCH_RESULTS, ADD_RESULT, RESULT_LIST, REMOVE_RESULT } from '../actions/resultaction'


var resultstate = {}


function resultreducer (state = {}, action) {

	const { result, tilte, id } = action
  
  switch (action.type) {
    
    
    case FETCH_RESULTS :
      return {
        ...state,
        ...action.results,
      }
      
      
      case RESULT_LIST :
      return {
        ...state, ...action.results,
      }
      
    
    
    case ADD_RESULT :
      return {
        ...state,
        ...result
      }
      
      
    case REMOVE_RESULT :
    var temp = {}
      for(key in state){
      	if( key !== action.id){
      		Object.assign(temp,   { [key] : state[key]}  )
      	}
      }
      return temp
      
    
    
    default :
      return state
  }
}



export default  resultreducer
 




















