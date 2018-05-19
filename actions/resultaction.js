export const FETCH_RESULTS = 'FETCH_RESULTS'
export const RESULT_LIST = 'RESULT_LIST'
export const ADD_RESULT = 'ADD_RESULT'
export const REMOVE_RESULT = 'REMOVE_RESULT'




export function fetchResults (results) {
  return {
    type: FETCH_RESULTS,
    results
  }
}



export function addResult (result) {
  //console.log(result)
  return {
    type: ADD_RESULT,
    result
  }
}



export function resultlist (results) {
  return {
    type: RESULT_LIST,
    results,
  }
}



export function removeResult (id) {
  return {
    type: REMOVE_RESULT,
    id,
  }
}











