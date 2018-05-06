import React, { Component } from 'react'
import { View, Text, ActivityIndicator, TouchableOpacity, StyleSheet, Animated } from 'react-native'
import { Foundation } from '@expo/vector-icons'
import { purple, white } from '../utils/colors'
import { Location, Permissions } from 'expo';
import { calculateDirection } from '../utils/helpers';





export default class GoodAnswer extends React.Component {
  
  
  render() {
  
  	
    return (
      <View style={styles.container}>
      
      
        <Text style={[styles.title, this.props.isActive && styles.activeTitle]}>
        	<Text>Good answer !!</Text>{'\n'}
        	
        </Text>
        
        
        <TouchableOpacity 
    		style={styles.button}
    		onPress={() => this.handleSubmit(questionArray)}
    	>
      	<Text> Submit answer </Text>
    	</TouchableOpacity>
    	
    	
    	<TouchableOpacity 
    		style={styles.button}
    		onPress={() => 
    			{
    			this.setState({ cardNumber : this.state.cardNumber<length-1 ? this.state.cardNumber+1 : 0 })
    			}
    		}
    	>
      	<Text> Move to next question </Text>
    	</TouchableOpacity>
    	
    	
    	<TouchableOpacity 
    		style={styles.button}
    		onPress={() => 
    			{
    			this.setState({ cardNumber : this.state.cardNumber>0 ? this.state.cardNumber-1 : length-1 })
    			}
    		}
    	>
      	<Text> Move to preceding question </Text>
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





