import React, { Component } from 'react';
import { View, StyleSheet, Button, Alert, TouchableOpacity, Text } from 'react-native';
import { submitEntryCard, removeDeck } from '../utils/api'
import { timeToString, timeToKey } from '../utils/helpers'
import { addCard } from '../actions'

import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'

import t from 'tcomb-form-native'; // 0.6.9

const Form = t.form.Form;

const card = t.struct({
  question: t.String,
  answer: t.String,
});




class AddCardForm extends Component {
  
  
  handleSubmit = (title) => {
    
    const formvalue = this._form.getValue();
    const value = Object.assign({ title : title }, formvalue);
    console.log(value)
    this.props.dispatch(addCard(value))
    
    this.props.navigation.navigate('Quiz', { deckTitle : title })
    submitEntryCard({ title, value })
    
  }
  
  
  
  render() {
  
  	const {deckName, keynum} = this.props.navigation.state.params
  
  
    return (
      <View style={styles.container}>
        
        <Text>Add card form</Text>
        <Text>deck : {deckName}</Text>
        
        <Form 
          ref={c => this._form = c} // assign a ref
          type={card} 
        />
        
        <TouchableOpacity 
    		style={styles.button}
    		onPress={() => this.handleSubmit(deckName)}
    	>
      	<Text>Add new card to deck </Text>
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





function mapStateToProps (state) {
  const key = timeToString()

  return {
    alreadyLogged: state[key] && typeof state[key].today === 'undefined'
  }
}

export default connect(
  mapStateToProps
)(AddCardForm)
















