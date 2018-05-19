import React, { Component } from 'react'
import { View, ScrollView, Text, ActivityIndicator, TouchableOpacity, StyleSheet, Animated, Button, ListView, FlatList, AsyncStorage, TextInput } from 'react-native'
import { Foundation } from '@expo/vector-icons'
import { purple, white } from '../utils/colors'
import { Location, Permissions } from 'expo';
import { decklist, addDeck } from '../actions/deckaction'
//import * as actions from '../actions'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

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
  				this.props.decklist(data) }
  			)
  			.catch((error) => console.log('AsyncStorage error: ' + error.message))
  			.done();
  		
	}
	
	
	
	handleSubmitfetchdeckold = async () => {
	
		await AsyncStorage.getItem('decks_v1')
  			.then( value  => { 
  				var data = JSON.parse(value)
  				this.props.dispatch(addDeck({ [data.title] : data  })) 
  			})
  			.catch((error) => console.log('AsyncStorage error: ' + error.message))
  			.done();
  	}
  
	
  
  render() {
  
  	const { decks } = this.props
  	const arraydeck = Object.entries(decks)
  	
  	
    return (
      <ScrollView contentContainerStyle={styles.contentContainer}>
        
        <Text style={styles.title}>Welcome to Flashcards</Text>
        
        {arraydeck.length === 0 
        	? <Text style={styles.title}>No deck for now</Text>  
        	: <Text style={styles.title}>Deck list</Text>
        }
        
        
        
        {arraydeck.map( item => {
        	return(
        	<DeckStart
        			key =  {item[0]}
        			title = {item[1].title}
        			id = {item[0]}
        			onPress={() => this.props.navigation.navigate(
        				'DeckItem',
        				{ 
        					id : item[0],
        					title : item[1].title,
        					length : item[1].questions.length,
        				})} 
        		/>)
        	}
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
    decks : state.deckreducer
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  	decklist : (decks) => {dispatch( decklist(decks) )}, 
  	//addDeck,
  	}
}



export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DeckList)




























