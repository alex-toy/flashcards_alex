import React, { Component } from 'react'
import { View, Text, ActivityIndicator, TouchableOpacity, StyleSheet, Animated } from 'react-native'
import { Foundation } from '@expo/vector-icons'
import { purple, white } from '../utils/colors'
import { Location, Permissions } from 'expo';
import { receiveDecks, addDeck } from '../actions'
import { connect } from 'react-redux'

import AddCard from './AddCard'
import { fetchCardResults } from '../utils/api'


class DeckItem extends React.Component {

	componentDidMount () {
    	const { dispatch } = this.props

    	fetchCardResults()
      	.then((entries) => dispatch(receiveCards(entries)))
      
  	}


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
  		return( <Text style={styles.options}> No cards for now </Text> )
  	}
  
  }
  
  
  render() {
  
  	const {title, keynum} = this.props.navigation.state.params
  	console.log(title)
    
    const { decks } = this.props
  	
  	const arraydeck = Object.entries(decks)
  	
  	const arraycard = Object.entries(decks).filter( card => card[1].title === title );
  	console.log('arraycard : ', arraycard)
  	
  	var length = arraycard[0][1].questions.length
    
    return (
      <View style={styles.container}>
      
      
        <Text style={[styles.title, this.props.isActive && styles.activeTitle]}>
        	<Text>Deck title : {title}</Text>{'\n'}
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
        
        
        
        
      </View>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
    margin : 10
  },
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
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    margin : 10
  },
  options: {
    alignItems: 'center',
    textAlign : 'center',
    backgroundColor: '#DDDDDD',
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





