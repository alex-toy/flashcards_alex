import React, { Component } from 'react'
import { View, ScrollView, Text, ActivityIndicator, TouchableOpacity, StyleSheet, Animated, Button, ListView, FlatList } from 'react-native'
import { Foundation } from '@expo/vector-icons'
import { purple, white } from '../utils/colors'
import { Location, Permissions } from 'expo';
import { calculateDirection } from '../utils/helpers';
import { receiveDecks, addDeck } from '../actions'
import { connect } from 'react-redux'


import DeckStart from './DeckStart'


class DeckList extends React.Component {

  
  render() {
  
  	const { decks } = this.props
  	const arraydeck = Object.entries(decks).filter( deck => deck[1].title !== undefined)
  	//console.log(arraydeck)
  	
  	
    return (
      <ScrollView contentContainerStyle={styles.contentContainer}>
        
        <Text style={styles.title}>Welcome to Flashcards</Text>
        
        {arraydeck.length === 0 
        	? <Text style={styles.title}>No deck for now</Text>  
        	: <Text style={styles.title}>Deck list</Text>
        }
        
        

		
        <FlatList
          data={arraydeck}
          keyExtractor={() => Math.random().toString(36).substr(2, 9)}
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




