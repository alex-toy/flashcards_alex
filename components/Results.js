import React, { Component } from 'react'
import { View, ScrollView, Text, ActivityIndicator, TouchableOpacity, StyleSheet, Animated, Button, ListView, FlatList, AsyncStorage, TextInput } from 'react-native'
import { Foundation } from '@expo/vector-icons'
import { purple, white } from '../utils/colors'
import { Location, Permissions } from 'expo';
import { calculateDirection } from '../utils/helpers';
import { receiveDecks, addDeck } from '../actions'
import { addResult, resultlist } from '../actions/resultaction'
import { connect } from 'react-redux'

//const STORAGE_KEY = '@flashcards:decks';

import DeckStart from './DeckStart'
import ResultStart from './ResultStart'



class Results extends React.Component {

	
	componentWillMount = async () => {
	
			await AsyncStorage.getItem('results_v1')
  			.then( value  => { 
  				var data = JSON.parse(value)
  				//console.log('data : ', data)
  				this.props.resultlist(data) }
  			)
  			.catch((error) => console.log('AsyncStorage error: ' + error.message))
  			.done();
	}
  
	
  
  render() {
  
  	const { results } = this.props
  	//console.log(this.props)
  	//console.log('results : ', results)
  	const arrayresults = Object.entries(results)
  	console.log('arrayresults : ', arrayresults)
  	
  	const arrayresultstemp = Object.entries(results)
  	
  	
    return (
      <ScrollView contentContainerStyle={styles.contentContainer}>
        
        <Text style={styles.title}>Results</Text>
        
        	{arrayresults.map( item => 
        		<ResultStart
        				key =  {item[0]}
        				title = {item[1].deckTitle}
        				date = {item[1].datetime}
        				score = {item[1].score}
        				totalWorth = {item[1].totalWorth}
        				id = {item[0]}
        			/>
        		
        	)}
        	
        	
        
        
      </ScrollView>
    ); 
  }
}




const styles = StyleSheet.create({
  title: {
    fontSize: 19,
    fontWeight: 'bold',
    color: 'green',
    padding: 20,
    textAlign : 'center'
  },
  activeTitle: {
    color: 'red',
  },
  contentContainer: {
    paddingVertical: 20
  }
});



function mapStateToProps (state) {
  return {
    results : state.resultreducer
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
  	resultlist : (results) => {dispatch( resultlist(results) )}, 
  	}
}



export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Results)











































