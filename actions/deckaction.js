export const DECKS_LIST = 'DECKS_LIST'
export const ADD_DECK = 'ADD_DECK'
export const UPDATE_SCORE_DECK = 'UPDATE_SCORE_DECK'
export const RESET_DECK_SCORE = 'RESET_DECK_SCORE'
export const REMOVE_DECK = 'REMOVE_DECK'
export const RECEIVE_CARDS = 'RECEIVE_CARDS'
export const ADD_CARD = 'ADD_CARD'



export function decklist (decks) {
  return {
    type: DECKS_LIST,
    decks,
  }
}


export function addDeck (deck) {
  return {
    type: ADD_DECK,
    deck,
  }
}


export function updateScoreDeck ({id, currentScore}) {
  return {
    type : UPDATE_SCORE_DECK,
    id,
    currentScore,
  }
}




export function resetDeckScore ({id}) {
  return {
    type : RESET_DECK_SCORE,
    id,
  }
}





export function receiveCards (cards) {
  return {
    type: RECEIVE_CARDS,
    cards,
  }
}

export function addCard (card) {
  return {
    type: ADD_CARD,
    card,
  }
}



export function removeDeck (id) {
  return {
    type: REMOVE_DECK,
    id,
  }
}














