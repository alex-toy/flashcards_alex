import React, { Component } from 'react'
import { View, Text, ActivityIndicator, TouchableOpacity, StyleSheet, Animated } from 'react-native'
import { Foundation } from '@expo/vector-icons'
import { purple, white } from '../utils/colors'
import { Location, Permissions } from 'expo';
import { receiveDecks, addDeck, resetDeckScore } from '../actions'
import { connect } from 'react-redux'

import AddCard from './AddCard'
import { fetchCardResults } from '../utils/api'


class DeckItem extends React.Component {

	moveToQuiz = (length, deckTitle) => {
  
  	if(length > 0){
  		return(
  			<TouchableOpacity 
    		style={styles.button}
    		onPress={() => this.props.navigation.navigate(
        			'Quiz',
        			{ 
        				deckTitle : deckTitle,
        			})}
    	>
      	<Text> start quiz </Text>
    	</TouchableOpacity>
  		)
  	} else {
  		return( <Text style={styles.forbiddenButton}> No cards for now </Text> )
  	}
  
  }
  
  
  	resetScore = () => {
  		var deckTitle = this.props.navigation.state.params.title
  		this.props.dispatch(resetDeckScore({ title : deckTitle }))
	}
  
  
  render() {
  
  	const {title, keynum} = this.props.navigation.state.params
  	console.log(title)
    
    const { decks } = this.props
  	
  	const arraydeck = Object.entries(decks)
  	
  	const deck = Object.entries(decks).filter( card => card[1].title === title )[0][1];
  	
  	const arraycard = deck.questions;
  	const length = arraycard.length;
  	
  	
	const totalWorth = arraycard.reduce((acc, currVal)=> acc + currVal.worth,0);
  	
  	//console.log('arraycard : ', arraycard)
  	
  	
    
    return (
      <View style={styles.container}>
      
      
        <Text style={styles.title}>
        	<Text>Deck title : {title}</Text>{'\n'}
        </Text>
        
        
        <Text style={styles.regularText}>
        	Number of cards :  {length}{'\n'}
        	Deck total worth :  {totalWorth}{'\n'}
        	Your current score :  {deck.currentScore}{'\n'}
        </Text>
        	
        
       
        <TouchableOpacity 
    		style={styles.button}
    		onPress={() => this.props.navigation.navigate(
        			'AddCardForm',
        			{ 
        				deckName : title,
        				keynum : keynum
        			})} 
    	>
      	<Text> Add new card </Text>
    	</TouchableOpacity>
    	
    	
    	
        
        {this.moveToQuiz(length, title)}
        
        
        
        
        <TouchableOpacity 
    		style={styles.button}
    		onPress={this.resetScore} 
    	>
      	<Text> Reset score </Text>
    	</TouchableOpacity>
        
        
        
        
      </View>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    borderRadius: 4,
    borderWidth: 0.5,
    margin : 10,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 19,
    fontWeight: 'bold',
    color: 'green',
    padding: 20,
    textAlign : 'center'
  },
  regularText: {
    color: 'green',
    padding: 20,
    textAlign : 'center'
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    margin : 10
  },
  forbiddenButton: {
    alignItems: 'center',
    textAlign : 'center',
    backgroundColor: 'red',
    padding: 10,
    margin : 10
  },
});



function mapStateToProps (decks) {
  return {
    decks
  }
}
export default connect(
  mapStateToProps,
)(DeckItem)





