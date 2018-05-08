import React, { Component } from 'react'
import { View, Text, ActivityIndicator, TouchableOpacity, StyleSheet, Animated, TextInput, AppRegistry, Alert, Button, } from 'react-native'
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import { Foundation } from '@expo/vector-icons'
import { purple, white } from '../utils/colors'
import { Location, Permissions } from 'expo';
import { calculateDirection } from '../utils/helpers';


import AddDeckForm from './AddDeckForm'



export default class AddDeck extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        
        <AddDeckForm />
        
      </View>
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
  container: {
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
    backgroundColor: '#ffffff',
  }
});





