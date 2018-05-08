export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const ADD_DECK = 'ADD_DECK'
export const UPDATE_SCORE_DECK = 'UPDATE_SCORE_DECK'
export const RESET_DECK_SCORE = 'RESET_DECK_SCORE'


export const RECEIVE_CARDS = 'RECEIVE_CARDS'
export const ADD_CARD = 'ADD_CARD'


export function receiveDecks (decks) {
  return {
    type: RECEIVE_DECKS,
    decks,
  }
}


export function addDeck (deck) {
  return {
    type: ADD_DECK,
    deck,
  }
}


export function updateScoreDeck ({title, currentScore}) {
  return {
    type : UPDATE_SCORE_DECK,
    title,
    currentScore,
  }
}




export function resetDeckScore ({title}) {
  return {
    type : RESET_DECK_SCORE,
    title,
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




















