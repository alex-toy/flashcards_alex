import { RECEIVE_DECKS, ADD_DECK, RECEIVE_CARDS, ADD_CARD } from '../actions'

function entries (state = {}, action) {
  
  switch (action.type) {
    
    
    case RECEIVE_DECKS :
      return {
        ...state,
        ...action.decks,
      }
    
    
    case ADD_DECK :
      return {
        ...state,
        ...action.deck
      }
      
      
    case RECEIVE_CARDS :
      return {
        ...state,
        ...action.cards,
      }
    
    
    case ADD_CARD :
      return {
        ...state,
        ...action.card
      }
    
    
    default :
      return state
  }
}

export default entries


























