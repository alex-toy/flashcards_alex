import React, { Component } from 'react';
import { View, StyleSheet, Button, Alert, TouchableOpacity, Text, TextInput } from 'react-native';
import { submitEntry, removeDeck } from '../utils/api'
import { timeToString, timeToKey } from '../utils/helpers'
import { addDeck } from '../actions'

import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'



class AddDeckForm extends Component {
  
  ID = () => { return '_' + Math.random().toString(36).substr(2, 9); }
  
  onSubmit = (event) => {
    this.setState({ deckName : event.nativeEvent.text });
    console.log(this.state.deckName)
    const key = this.ID()
    const postedOn = timeToKey()
    const value = Object.assign({ questions : [] }, {title : this.state.deckName} )
    console.log(value)
    this.props.dispatch(addDeck({
      [this.state.deckName]: value
    }))
    
    //this.props.navigation.navigate('DeckList')
    submitEntry({ key, value })
  }
  
  
  render() {
    return (
      <View style={styles.container}>
        
    	
    	<Text style={styles.title}> Deck creation </Text>
    	<TextInput
          style={styles.deckInput}
          placeholder="Enter here the name of the deck"
          onChangeText={(text) => this.setState({text})}
          onSubmitEditing={this.onSubmit}
        />
        
        
      </View>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    margin : 10
  },
  title : {
    alignItems: 'center',
    textAlign : 'center',
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: '#DDDDDD',
    padding: 10,
    margin : 10,
    borderColor : 'black'
  },
  deckInput : {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    margin : 10,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: 'black',
  },
  
});




export default connect()(AddDeckForm)
















