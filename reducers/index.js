import { RECEIVE_DECKS, ADD_DECK, RECEIVE_CARDS, ADD_CARD, UPDATE_SCORE_DECK, RESET_DECK_SCORE } from '../actions'

function entries (state = {}, action) {

	const { card, deck, title, question, answer, currentScore } = action
  
  switch (action.type) {
    
    case RECEIVE_DECKS :
      return {
        ...state,
        ...action.decks,
      }
    
    
    case ADD_DECK :
      return {
        ...state,
        ...deck
      }
      
    
    case UPDATE_SCORE_DECK :
    	return {
        ...state, [action.title] : {
        	...state[action.title], currentScore : state[title].currentScore + currentScore
        }
      }
      
      
      
      case RESET_DECK_SCORE :
    	console.log('RESET_DECK_SCORE')
    	
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
        ...state, [card.title] : {
        	...state[card.title], questions : [
        		...state[card.title].questions, {question : card.question, answer : card.answer,  worth : card.worth,}
        		]
        }
      }
    
    
    default :
      return state
  }
}

export default entries


























