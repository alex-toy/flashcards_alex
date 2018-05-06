import React, { Component } from 'react';
import { View, StyleSheet, Button, Alert, TouchableOpacity, Text } from 'react-native';
import { submitEntry, removeDeck } from '../utils/api'
import { timeToString, timeToKey } from '../utils/helpers'
import { addDeck } from '../actions'

import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'

import t from 'tcomb-form-native'; // 0.6.9

const Form = t.form.Form;

const deck = t.struct({
  title: t.String,
});




class AddDeckForm extends Component {
  
  ID = () => { return '_' + Math.random().toString(36).substr(2, 9); }
  
  handleSubmit = () => {
    
    const formvalue = this._form.getValue();
    //console.log(formvalue)
    const key = this.ID()
    const postedOn = timeToKey()
    const value = Object.assign({ questions : [] }, formvalue)
    console.log(value)
    this.props.dispatch(addDeck({
      [value.title]: value
    }))
    
    //this.props.navigation.navigate('DeckList')
    submitEntry({ key, value })
    
    
  }
  
  
  render() {
    return (
      <View style={styles.container}>
        
        <Form 
          ref={c => this._form = c} // assign a ref
          type={deck} 
        />
        
        <TouchableOpacity 
    		style={styles.button}
    		onPress={this.handleSubmit}
    	>
      	<Text> Add new deck </Text>
    	</TouchableOpacity>
        
        
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
  }
});




export default connect()(AddDeckForm)
















