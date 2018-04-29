import React, { Component } from 'react'
import { View, Text, ActivityIndicator, TouchableOpacity, StyleSheet, Animated, Button } from 'react-native'
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
  	
  	const testdate = new Date()
  	
  	
  	const arraydeck = Object.entries(decks)
  	
  	
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        
        <Text style={styles.title}>DeckList</Text>
        
        
        {arraydeck.length === 0 && <Text style={styles.title}>No deck for now</Text>  }

        
        {arraydeck.map(date_deck => (
        	<DeckStart 
        		title = {date_deck[1].title}
        		date = {date_deck[0]}
        		onPress={() => this.props.navigation.navigate(
        			'DeckItem',
        			{ 
        				title : date_deck[1].title,
        				date : date_deck[0]
        			})} 
        	/>
		))}
		
		
		
		<DeckStart 
        		title = 'testdeck'
        		date = {testdate}
        		onPress={() => this.props.navigation.navigate(
        			'DeckItem',
        			{ 
        				title : 'testdeck',
        				date : {testdate}
        			})} 
        	/>
        	
        	
        	
    
        	
        
        
      </View>
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
});



function mapStateToProps (decks) {
  return {
    decks
  }
}
export default connect(
  mapStateToProps,
)(DeckList)




