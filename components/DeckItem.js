import React, { Component } from 'react'
import { View, Text, ActivityIndicator, TouchableOpacity, StyleSheet, Animated } from 'react-native'
import { Foundation } from '@expo/vector-icons'
import { purple, white } from '../utils/colors'
import { Location, Permissions } from 'expo';
import { calculateDirection } from '../utils/helpers';

import AddCard from './AddCard'



export default class DeckItem extends React.Component {
  
  
  render() {
  
  	const {title, postedOn, keynum} = this.props.navigation.state.params
    
    var date = new Date(postedOn);
    var month = date.getMonth() + 1
    const creationdate = date.getDate() + '/' + month + '/' + date.getFullYear() 
    
    return (
      <View style={styles.container}>
      
      
        <Text style={[styles.title, this.props.isActive && styles.activeTitle]}>
        	<Text>{title}</Text>{'\n'}
        	<Text>created on {creationdate}</Text>
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
    	
    	
    	
    	
    	<TouchableOpacity 
    		style={styles.button}
    		onPress={() => this.props.navigation.navigate(
        			'Quiz',
        			{ 
        				title : 'Add card for deck' + this.props.navigation.state.params.title,
        				deckName : this.props.navigation.state.params.title
        			})}
    	>
      	<Text> start quiz </Text>
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





