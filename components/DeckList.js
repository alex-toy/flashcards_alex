import React, { Component } from 'react'
import { View, ScrollView, Text, ActivityIndicator, TouchableOpacity, StyleSheet, Animated, Button, ListView, FlatList } from 'react-native'
import { Foundation } from '@expo/vector-icons'
import { purple, white } from '../utils/colors'
import { Location, Permissions } from 'expo';
import { calculateDirection } from '../utils/helpers';
import { receiveDecks, addDeck } from '../actions'
import { connect } from 'react-redux'


import DeckStart from './DeckStart'



import { fetchDeckResults } from '../utils/api'






class DeckList extends React.Component {

  state = {
    ready: false,
  }
  
  componentDidMount () {
    const { dispatch } = this.props

    fetchDeckResults()
      .then((entries) => dispatch(receiveDecks(entries)))
      
  }
  
  
  
  
  
  render() {
  
  	const { decks } = this.props
  	const arraydeck = Object.entries(decks).filter( deck => deck[1].title !== undefined)
  	console.log(arraydeck)
  	
  	
    return (
      <ScrollView contentContainerStyle={styles.contentContainer}>
        
        <Text style={styles.title}>Welcome to Flashcards</Text>
        
        {arraydeck.length === 0 
        	? <Text style={styles.title}>No deck for now</Text>  
        	: <Text style={styles.title}>Deck list</Text>
        }
        
        

		
        <FlatList
          data={arraydeck}
          renderItem={({item}) => 
          		<DeckStart 
        			title = {item[0]}
        			onPress={() => this.props.navigation.navigate(
        				'DeckItem',
        				{ 
        					title : item[0],
        					length : item[1].questions.length,
        				})} 
        		/>
        }/>
        
           
        
      </ScrollView>
    );
  }
}




const styles = StyleSheet.create({
  container: {
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
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




