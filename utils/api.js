import { AsyncStorage } from 'react-native'

const DECK_STORAGE_KEY = 'flashcards:deck'


export function fetchDeckResults () {
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
    .then( res => JSON.parse(res) )
}


export function submitEntry ({ deck, key }) {
  return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({
    [key]: deck
  }))
}


export function removeDeck (key) {
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
    .then((results) => {
      const data = JSON.parse(results)
      data[key] = undefined
      delete data[key]
      AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(data))
    })
}





const CARD_STORAGE_KEY = 'flashcards:card'


export function fetchCardResults () {
  return AsyncStorage.getItem(CARD_STORAGE_KEY)
    .then( res => JSON.parse(res) )
}


export function submitEntryCard ({ card, key }) {
  return AsyncStorage.mergeItem(CARD_STORAGE_KEY, JSON.stringify({
    [key]: card
  }))
}














