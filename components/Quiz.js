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
    
    
    const { decks } = this.props
  	
  
  	const arraydeck = Object.entries(decks)
  	
  	
  	const arraycard = Object.entries(decks)
  	console.log(arraycard)
    
    
    
    return (
      <View style={styles.container}>
      
        <Text style={[styles.title, this.props.isActive && styles.activeTitle]}>
        	
        	
        	<Text>quiz</Text>
        	
        	
        	
        	
        </Text>
        
        
        
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



function mapStateToProps (decks) {
  return {
    decks
  }
}
export default connect(
  mapStateToProps,
)(Quiz)











