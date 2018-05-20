import React, { Component } from 'react'
import { View, Text, Button, ActivityIndicator, TouchableHighlight, TouchableOpacity, StyleSheet, Animated, AsyncStorage } from 'react-native'
import { Foundation } from '@expo/vector-icons'
import { purple, white } from '../utils/colors'
import { Location, Permissions } from 'expo';
import { calculateDirection } from '../utils/helpers';
import { StackNavigator } from 'react-navigation';
import { receiveDecks, addDeck, resetDeckScore, removeDeck } from '../actions/deckaction'
import { connect } from 'react-redux'

import DeckItem from './DeckItem'





class DeckStart extends React.Component {


	handleRemoveDeck = async (id) => {
  		await AsyncStorage.getItem( 'decks_v1' )
    		.then( data => {
    			data = JSON.parse( data );
    			data[id] = undefined
				delete data[id]
      			AsyncStorage.setItem( 'decks_v1', JSON.stringify( data ) );
    	})
    	.then( this.props.removeDeck(id) )
    	.done();
  		
	}



  render() {
  
  	const {postedOn, title, keynum, id} = this.props
  	
   
    return (
      <View style={styles.container}>
        
        <Text style={styles.title}>
        <Button
        	style={styles.button}
        	title={"Go to " + title}
        	onPress={this.props.onPress}
        />
        </Text>
        
        
        <TouchableOpacity 
    		style={styles.button}
    		onPress={() => this.handleRemoveDeck(id)} 
    	>
      	<Text> Remove deck </Text>
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
    borderRadius: 4,
    borderWidth: 3,
    borderColor: 'blue',
  },
  title: {
    fontWeight: 'bold',
    color: 'green',
    padding: 7,
    margin: 5,
    textAlign : 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: 200
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'blue',
    padding: 10
  },
});




function mapStateToProps (state) {
  return {
    decks : state.deckreducer
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
  	removeDeck : (id) => {dispatch( removeDeck({id : id}) )},
  	}
}



export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DeckStart)









