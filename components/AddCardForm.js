import React, { Component } from 'react';
import { View, StyleSheet, Button, Alert, TouchableOpacity, Text, TextInput, ScrollView } from 'react-native';
import { submitEntryCard, removeDeck } from '../utils/api'
import { timeToString, timeToKey } from '../utils/helpers'
import { addCard } from '../actions'

import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'


class AddCardForm extends Component {

	constructor(props) {
    	super(props)
    	this.state = { question : '', answer : '',  worth : 0,}
  	}
  
  
  handleSubmit = async (title) => {
    
    const formvalue = {
    	question : this.state.question, 
    	answer : this.state.answer, 
    	worth : Number(this.state.worth)
    }
    const value = Object.assign({ title : title }, formvalue);
    //console.log(value)
    
    //await AsyncStorage.mergeItem('cards', JSON.stringify({ [title] : value }))
    
    
    this.props.dispatch(addCard(value))
    
    this.props.navigation.navigate('Quiz', { deckTitle : title })
    submitEntryCard({ title, value })
    
  }
  
  
  renderSubmitButton = (deckName) => {
  
  	if(this.state.question === '' || this.state.answer === '' || this.state.worth === ''){
    	return(
    		<TouchableOpacity 
    			style={styles.forbiddenButton}
    			onPress={() => Alert.alert('Tu dois dabord remplir le formulaire, abruti!!')}
    		>
      		<Text>Add new card to deck</Text>
    		</TouchableOpacity>
    	)
    } else {
    	return(
    		<TouchableOpacity 
    			style={styles.button}
    			onPress={() => this.handleSubmit(deckName)}
    		>
      		<Text>Add new card to deck</Text>
    		</TouchableOpacity>
    	)
    }
  }
  
  
  
  
  
  render() {
  
  	const {deckName, keynum} = this.props.navigation.state.params
  
  
    return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      <View style={styles.container}>
        
        <Text style={styles.title}>
        	Add card form {'\n'}
        	Deck : {deckName}
        </Text>
        
        
    	
    	<TextInput
          style={styles.deckInput}
          placeholder="Enter here the question"
          onChangeText={(text) => this.setState({question : text})}
        />
        
        <TextInput
          style={styles.deckInput}
          placeholder="Enter here the answer"
          onChangeText={(text) => this.setState({answer : text})}
        />
        
        <TextInput
          style={styles.deckInput}
          placeholder="Enter here the question's worth"
          onChangeText={(text) => this.setState({worth : Number(text)})}
        />
        
    	
    	{this.renderSubmitButton(deckName)}
    	
        
        
      </View>
       </ScrollView>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
    backgroundColor: 'white',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    margin : 10
  },
  forbiddenButton: {
    alignItems: 'center',
    backgroundColor: 'red',
    padding: 10,
    margin : 10
  },
  deckInput : {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    margin : 10,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: 'black',
  },
  title : {
    alignItems: 'center',
    textAlign : 'center',
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: '#DDDDDD',
    padding: 10,
    margin : 10,
    borderColor : 'black',
    borderRadius: 5,
  },
});




export default connect()(AddCardForm)
















