import React, { Component } from 'react'
import { View, Text, ActivityIndicator, TouchableOpacity, StyleSheet, Animated, AsyncStorage } from 'react-native'
import { Foundation } from '@expo/vector-icons'
import { purple, white } from '../utils/colors'
import { Location, Permissions } from 'expo';
import { receiveDecks, addDeck, resetDeckScore, removeDeck } from '../actions'
import { connect } from 'react-redux'

//import { fetchCardResults } from '../utils/api'


class DeckItem extends React.Component {

	
	moveToQuiz = (length, deckTitle, id) => {
  
  	if(length > 0){
  		return(
  			<TouchableOpacity 
    		style={styles.button}
    		onPress={() => this.props.navigation.navigate(
        			'Quiz',
        			{ 
        				deckTitle : deckTitle,
        				id : id
        			})}
    	>
      	<Text> start quiz </Text>
    	</TouchableOpacity>
  		)
  	} else {
  		return( <Text style={styles.forbiddenButton}> No cards for now </Text> )
  	}
  
  }
  
  
  	resetScore = async (title) => {
  	
  		AsyncStorage.getItem( 'decks_v1' )
    	.then( data => {

    		console.log( data );
			data = JSON.parse( data );
    		console.log( data );
			for (var key in data) {
    
    			if (!data.hasOwnProperty(key)) continue;
				if(data[key].title === title){
					data[key].currentScore = 0
				}
    		}
    		console.log(data)
      
      	AsyncStorage.setItem( 'decks_v1', JSON.stringify( data ) );

    	}).done();
  		
  		this.props.dispatch(resetDeckScore({ title : title }))
	}
	
	
	
	
  render() {
  
  	const {title, id, keynum} = this.props.navigation.state.params
  	const { decks } = this.props
  	const arraydeck = Object.entries(decks)
  	const deck = arraydeck.filter( item => item[0] === id )
  	const arraycard = deck[0][1].questions
  	const score = deck[0][1].currentScore
  	const length = arraycard.length;
  	const totalWorth = arraycard.reduce((acc, currVal)=> acc + currVal.worth,0);
  	
  	
    return (
      <View style={styles.container}>
      
      
        <Text style={styles.title}>
        	<Text>Deck title : {title}</Text>{'\n'}
        </Text>
        
        
        <Text style={styles.regularText}>
        	Number of cards :  {length}{'\n'}
        	Deck total worth :  {totalWorth}{'\n'}
        	Your current score :  {score}{'\n'}
        </Text>
        	
        
       
        <TouchableOpacity 
    		style={styles.button}
    		onPress={() => this.props.navigation.navigate(
        			'AddCardForm',
        			{ 
        				id : id,
        				deckName : title,
        				keynum : keynum
        			})} 
    	>
      	<Text> Add new card </Text>
    	</TouchableOpacity>
    	
    	
    	
        
        {this.moveToQuiz(length, title, id)}
        
        
        
        
        <TouchableOpacity 
    		style={styles.button}
    		onPress={() => this.resetScore(title)} 
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
    decks : decks.deckreducer
  }
}
export default connect(
  mapStateToProps,
)(DeckItem)





