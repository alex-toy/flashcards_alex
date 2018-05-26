import React, { Component } from 'react';
import { View, StyleSheet, Button, Alert, TouchableOpacity, Text, TextInput, ScrollView, AsyncStorage } from 'react-native';
import { submitEntryCard, removeDeck } from '../utils/api'
import { timeToString, timeToKey } from '../utils/helpers'
import { addCard } from '../actions/deckaction'

import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'


class AddCardForm extends Component {

	constructor(props) {
    	super(props)
    	this.state = { question : '', answer : '',  worth : 0,}
  	}
  
  
  handleSubmit = async (title, id) => {
    
    const question = {
    	question : this.state.question, 
    	answer : this.state.answer, 
    	worth : Number(this.state.worth)
    }
    const value = Object.assign({ id : id }, question);
    
    AsyncStorage.getItem( 'decks_v1' )
    .then( data => {
		data = JSON.parse( data );
		for (var key in data) {
			if(key === id){
				data[key].questions.push(question)
			}
    	}
      
      AsyncStorage.setItem( 'decks_v1', JSON.stringify( data ) );

    }).done();
    
    
    
    this.props.dispatch(addCard(value))
    
    //this.props.navigation.navigate('Quiz', { deckTitle : title, id : id })
    //this.props.navigation.navigate('DeckList')
    this.props.navigation.navigate('DeckItem', {title : title, id : id})
    
  }
  
  
  renderSubmitButton = (deckName, id) => {
  
  	if(this.state.question === '' || this.state.answer === '' ){
    	return(
    		<TouchableOpacity 
    			style={styles.forbiddenButton}
    			onPress={() => { Alert.alert('Tu dois dabord remplir le formulaire, abruti!!')}}
    		>
      		<Text>Add new card to deck</Text>
    		</TouchableOpacity>
    	)
    } else if(this.state.worth === 0 ||isNaN(parseInt(this.state.worth)) || this.state.worth === ''){
    	return(
    		<TouchableOpacity 
    			style={styles.forbiddenButton}
    			onPress={() => { Alert.alert('La valeur doit être un nombre, abruti!!')}}
    		>
      		<Text>Add new card to deck</Text>
    		</TouchableOpacity>
    	)
    } else {
    	return(
    		<TouchableOpacity 
    			style={styles.button}
    			onPress={() => { this.handleSubmit(deckName, id) }}
    		>
      		<Text>Add new card to deck</Text>
    		</TouchableOpacity>
    	)
    }
  }
  
  
  
  
  
  render() {
  
  	const {id, deckName, keynum} = this.props.navigation.state.params
  	
  
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
          //onChangeText={(text) => this.setState({worth : parseInt(text)})}
          onChangeText={(text) => this.setState({worth : text})}
        />
        
    	
    	{this.renderSubmitButton(deckName, id)}
    	
        
        
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
















