import { RECEIVE_DECKS, ADD_DECK, RECEIVE_CARDS, ADD_CARD } from '../actions'

function entries (state = {}, action) {

	const { card, deck, title, question, answer } = action
  
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
      
      
    case RECEIVE_CARDS :
      return {
        ...state,
        ...action.cards,
      }
    
    
    case ADD_CARD :
      console.log('ADD_CARD')
      console.log('title : ', card.title)
      
      return {
        ...state, [card.title] : {
        	...state[card.title], questions : [
        		...state[card.title].questions, {question : card.question, answer : card.answer }
        	]
        }
      }
    
    
    default :
      return state
  }
}

export default entries


























