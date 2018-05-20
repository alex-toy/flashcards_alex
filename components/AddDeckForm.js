import React, { Component } from 'react';
import { View, StyleSheet, Button, Alert, TouchableOpacity, Text, TextInput, AsyncStorage } from 'react-native';
import { removeDeck, recordDeck } from '../utils/api'
import { timeToString, timeToKey } from '../utils/helpers'
import { addDeck } from '../actions/deckaction'

import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'


var STORAGE_KEY = '@flashcards:decks';


class AddDeckForm extends Component {

	constructor(props) {
    	super(props)
    	this.state = { deckName : '' }
  	}



	renderSubmitButton = () => {
  
  	if(this.state.deckName === ''){
    	return(
    		<TouchableOpacity 
    			style={styles.forbiddenButton}
    			onPress={() => Alert.alert('Tu dois dabord mettre un nom pour le "deck", malin!!')}
    		>
      		<Text>Add new deck</Text>
    		</TouchableOpacity>
    	)
    } else {
    	return(
    		<TouchableOpacity 
    			style={styles.button}
    			onPress={this.onSubmit}
    		>
      		<Text>Add new deck</Text>
    		</TouchableOpacity>
    	)
    }
  }
  
  
	ID = () => { return '_' + Math.random().toString(36).substr(2, 9); }
  
  	
  	onSubmit =  async () => {
    
    	const deckName = this.state.deckName
    	var value = {
    		title : this.state.deckName, 
    		currentScore : 0,
    		questions : [],
    		pseudo : this.props.screenProps.pseudo
    	}
    	
    	var deckitem = { [this.ID()] : value }
		
    	await AsyncStorage.mergeItem( 'decks_v1', JSON.stringify( deckitem ) )
  		.then( () => this.props.addDeck(deckitem) )
    	.done();
    	
	}
	
	
  
  render() {
  
  
  	const { screenProps } = this.props
  	const pseudo = screenProps.pseudo
  
  
    return (
      <View style={styles.container}>
        
    	
    	<Text style={styles.title}> Deck creation </Text>
    	
    	<TextInput
          style={styles.deckInput}
          placeholder="Enter here the name of the deck"
          onChangeText={(text) => this.setState({deckName : text})}
        />
        
    	
    	
    	{this.renderSubmitButton()}
    	
    	
      </View>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
    backgroundColor: 'white',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    margin : 10
  },
  title : {
    alignItems: 'center',
    textAlign : 'center',
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: '#DDDDDD',
    padding: 10,
    margin : 10,
    borderColor : 'black',
    borderRadius: 5,
  },
  deckInput : {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    margin : 10,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: 'black',
  },
  forbiddenButton: {
    alignItems: 'center',
    backgroundColor: 'red',
    padding: 10,
    margin : 10
  },
});




const mapDispatchToProps = (dispatch) => {
  return {
  	addDeck : (deck) => {dispatch( addDeck(deck) )}, 
  	}
}



export default connect(null, mapDispatchToProps)(AddDeckForm)
















