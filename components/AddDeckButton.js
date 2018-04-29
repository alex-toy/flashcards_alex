import React, { Component } from 'react';
import { Alert, AppRegistry, Button, StyleSheet, View, TouchableOpacity, Text } from 'react-native';

export default class AddDeckButton extends Component {
  
  
  _onAddNewDeck() {
    Alert.alert('You tapped the button!')
    
    
    
    
    
  }





render() {
    return (
      <View style={styles.container}>
        
        <TouchableOpacity 
    		style={styles.button}
    		onPress={this._onAddNewDeck}
    	>
      	<Text> Add new deck </Text>
    	</TouchableOpacity>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   justifyContent: 'center',
  },
  buttonContainer: {
    margin: 20
  },
  alternativeLayoutButtonContainer: {
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    margin : 10
  }
})