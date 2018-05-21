import React, { Component } from 'react'
import { View, Text, Button, ActivityIndicator, TouchableHighlight, TouchableOpacity, StyleSheet, Animated } from 'react-native'
import { Foundation } from '@expo/vector-icons'
import { purple, white } from '../utils/colors'
import { Location, Permissions } from 'expo';
import { calculateDirection } from '../utils/helpers';




export default class ProfileScreen extends React.Component {
  
  
  render() {
  
  	
  
    return (
      <View style={styles.container}>
        
        <Text style={[styles.title, this.props.isActive && styles.activeTitle]}>
        	ProfileScreen
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
    backgroundColor: 'blue',
    padding: 10
  },
  countContainer: {
    alignItems: 'center',
    padding: 10
  },
  countText: {
    color: '#FF00FF'
  }
});










