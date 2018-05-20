import { 
	ADD_USER
} from '../actions/useraction'



function userreducer (state = {}, action) {

	const { user } = action
  
  switch (action.type) {
    
    case ADD_USER :
      console.log(user)
      return {
        ...state,
        ...user
      }
    
    
    default :
      return state
  }
}



export default  userreducer
 




















