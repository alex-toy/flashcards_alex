import React, { Component } from 'react'
import { View, Text, ActivityIndicator, TouchableOpacity, StyleSheet, Animated } from 'react-native'
import { Foundation } from '@expo/vector-icons'
import { purple, white } from '../utils/colors'
import { Location, Permissions } from 'expo';
import { calculateDirection } from '../utils/helpers';

//import AddCard from './AddCard'
import CardItem from './CardItem'



import { fetchCardResults } from '../utils/api'
import { connect } from 'react-redux'



class Quiz extends React.Component {
  
  
  
  render() {
    
    const { deckTitle, id } = this.props.navigation.state.params
    const { decks } = this.props
    console.log(decks)
  	
  	const arraydeck = Object.entries(decks)

  	const arraycard = arraydeck.filter( card => card[0] === id );
  	console.log('arraycard', arraycard)
  	var length = arraycard[0][1].questions.length
    
    
    
    return (
      <View style={styles.container}>
      
        	<Text style={styles.title}>Quiz for {deckTitle}</Text>
        	
        	<Text style={styles.regularText}>Number of cards :  {length}</Text>
        	
        	
        	<TouchableOpacity 
    			style={styles.button}
    			onPress={() => this.props.navigation.navigate(
        				'CardItem',
        				{ 
        					deckTitle : deckTitle,
        					id : id
        				})} 
    		>
      		<Text>Move to cards</Text>
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
    padding: 20,
    textAlign : 'center'
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
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
)(Quiz)











