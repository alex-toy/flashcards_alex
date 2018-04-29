import React, { Component } from 'react'
import { View, Text, ActivityIndicator, TouchableOpacity, StyleSheet, Animated } from 'react-native'
import { Foundation } from '@expo/vector-icons'
import { purple, white } from '../utils/colors'
import { Location, Permissions } from 'expo';
import { calculateDirection } from '../utils/helpers';





function AddCardButton () {
  return (
    <TouchableOpacity style={styles.button}>
      <Text> Add card </Text>
    </TouchableOpacity>
  )
}




function StartQuizButton () {
  return (
    <TouchableOpacity style={styles.button}>
      <Text> Start quiz </Text>
    </TouchableOpacity>
  )
}





export default class AddDeck extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        
        <Text style={styles.greenLarge}>Udacicards</Text>
        
        <Text style={styles.red}>Number of cards : </Text>
        
        
        <AddCardButton />
        
        
        <StartQuizButton />
        
        
      </View>
    );
  }
}



const styles = StyleSheet.create({
  greenLarge: {
    color: 'green',
    fontWeight: 'bold',
    fontSize: 40
  },
  red: {
    color: 'red',
    padding: 30
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    margin : 10
  },
});