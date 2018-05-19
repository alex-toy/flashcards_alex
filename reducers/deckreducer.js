import { 
	DECKS_LIST, ADD_DECK, RECEIVE_CARDS, ADD_CARD, 
	UPDATE_SCORE_DECK, RESET_DECK_SCORE, REMOVE_DECK 
} from '../actions/deckaction'




function deckreducer (state = {}, action) {

	const { card, deck, title, question, answer, currentScore, id } = action
  
  switch (action.type) {
    
    
    case DECKS_LIST :
      return {
        ...state, ...action.decks,
      }
      
    
    
    case ADD_DECK :
      console.log(deck)
      return {
        ...state,
        ...deck
      }
      
     
      
    case REMOVE_DECK :
      var temp = {}
      for(key in state){
      	if( key !== title){
      		Object.assign(temp,   { [key] : state[key]}  )
      	}
      }
      return temp
      
      
    
    case UPDATE_SCORE_DECK :
    	return {
        ...state, [action.id] : {
        	...state[action.id], currentScore : state[id].currentScore + currentScore
        }
      }
      
      
      
      case RESET_DECK_SCORE :
    	return {
        ...state, [action.title] : {
        	...state[action.title], currentScore : 0
        }
      }
      
      
      
    case RECEIVE_CARDS :
      return {
        ...state,
        ...action.cards,
      }
    
    
    case ADD_CARD :
      return {
        ...state, [card.id] : {
        	...state[card.id], questions : [
        		...state[card.id].questions, {question : card.question, answer : card.answer,  worth : card.worth,}
        		]
        }
      }
    
    
    default :
      return state
  }
}



export default  deckreducer
 




















