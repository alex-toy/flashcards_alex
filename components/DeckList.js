import React, { Component } from 'react'
import { View, ScrollView, Text, ActivityIndicator, TouchableOpacity, StyleSheet, Animated, Button, ListView, FlatList, AsyncStorage, TextInput } from 'react-native'
import { Foundation } from '@expo/vector-icons'
import { purple, white } from '../utils/colors'
import { Location, Permissions } from 'expo';
import { calculateDirection } from '../utils/helpers';
import { receiveDecks, addDeck } from '../actions'
import { connect } from 'react-redux'

const STORAGE_KEY = '@flashcards:decks';

import DeckStart from './DeckStart'


class DeckList extends React.Component {

	constructor(props) {
    	super(props)
    	this.state = { testentry : ''}
  	}


	componentWillMount = async () => {
	
			await AsyncStorage.getItem('decks_v1')
  			.then( value  => { 
  				var data = JSON.parse(value)
  				console.log('data : ', data)
  				//this.props.dispatch(addDeck({ [data.title] : data  })) }
  				this.props.dispatch(addDeck(data)) }
  			)
  			.catch((error) => console.log('AsyncStorage error: ' + error.message))
  			.done();
  			
  			//this.props.dispatch(addDeck({ [value.title] : value  }))
  		
	}
	
	
	
	handleSubmitfetchdeck = async () => {
	
		console.log('handleSubmitfetchdeck')
		await AsyncStorage.getItem('decks_v1')
  			.then( value  => { 
  				var data = JSON.parse(value)
  				console.log('data : ', data)
  				this.props.dispatch(addDeck({ [data.title] : data  })) 
  			})
  			.catch((error) => console.log('AsyncStorage error: ' + error.message))
  			.done();
  	}
  
	
  
  render() {
  
  	const { decks } = this.props
  	console.log('decks : ', decks)
  	const arraydeck = Object.entries(decks)
  	console.log('arraydeck : ', arraydeck)
  	
  	
  	
  	
    return (
      <ScrollView contentContainerStyle={styles.contentContainer}>
        
        <Text style={styles.title}>Welcome to Flashcards</Text>
        
        {arraydeck.length === 0 
        	? <Text style={styles.title}>No deck for now</Text>  
        	: <Text style={styles.title}>Deck list</Text>
        }
        
        

		
        {arraydeck.map( item => 
        	Object.entries(item).map( item => {
        	
        	if(item[1].title !== undefined){
        	//console.log(item[1].questions.length)
        	return(
        	<DeckStart
        			key =  {item[1].title}
        			title = {item[1].title}
        			onPress={() => this.props.navigation.navigate(
        				'DeckItem',
        				{ 
        					title : item[1].title,
        					length : item[1].questions.length,
        				})} 
        		/>)}})
        )}
        
        
        	
       
        	
        	
        	
        	<TouchableOpacity 
    			style={styles.button}
    			onPress={() => this.handleSubmitfetchdeck()}
    		>
      			<Text>fetch deck</Text>
    		</TouchableOpacity>
        
        
        
        
        
        
        
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



function mapStateToProps (decks) {
  return {
    decks
  }
}
export default connect(
  mapStateToProps,
)(DeckList)




