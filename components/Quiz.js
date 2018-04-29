import React, { Component } from 'react'
import { View, Text, ActivityIndicator, TouchableOpacity, StyleSheet, Animated } from 'react-native'
import { Foundation } from '@expo/vector-icons'
import { purple, white } from '../utils/colors'
import { Location, Permissions } from 'expo';
import { calculateDirection } from '../utils/helpers';

import AddCard from './AddCard'

import { fetchCardResults } from '../utils/api'
import { connect } from 'react-redux'



class Quiz extends React.Component {
  
  
  state = {
    ready: false,
  }
  
  componentDidMount () {
    const { dispatch } = this.props

    fetchCardResults()
      .then((entries) => dispatch(receiveCards(entries)))
      
  }
  
  
  
  
  
  
  
  render() {
    
    var date = new Date(this.props.navigation.state.params.date);
    var month = date.getMonth() + 1
    const creationdate = date.getDate() + '/' + month + '/' + date.getFullYear() 
    
    
    
    const { cards } = this.props
  	
  	
  	const arraycard = Object.entries(cards)
  	console.log(arraycard)
    
    
    
    return (
      <View style={styles.container}>
      
        <Text style={[styles.title, this.props.isActive && styles.activeTitle]}>
        	
        	<Text>{this.props.navigation.state.params.deckName}</Text>{'\n'}
        	
        	<Text>question</Text>
        	
        	
        	
        	
        </Text>
        
        
        
       
        <TouchableOpacity 
    		style={styles.button}
    		onPress={() => this.props.navigation.navigate(
        			'AddCardForm',
        			{ 
        				title : 'Add card for deck' + this.props.navigation.state.params.title,
        				deckName : this.props.navigation.state.params.title
        			})} 
    	>
      	<Text> Correct </Text>
    	</TouchableOpacity>
    	
    	
    	
    	
    	<TouchableOpacity 
    		style={styles.button}
    		onPress={() => this.props.navigation.navigate(
        			'Quiz',
        			{ 
        				title : 'Add card for deck' + this.props.navigation.state.params.title,
        				deckName : this.props.navigation.state.params.title
        			})}
    	>
      	<Text> incorrect </Text>
    	</TouchableOpacity>
        
        
        
        
        
        
        
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
});



function mapStateToProps (cards) {
  return {
    cards
  }
}
export default connect(
  mapStateToProps,
)(Quiz)











