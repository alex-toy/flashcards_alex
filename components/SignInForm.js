import React, { Component } from 'react';
import { View, StyleSheet, Button, Alert, TouchableOpacity, Text, TextInput, ScrollView, AsyncStorage } from 'react-native';
import { submitEntryCard, removeDeck } from '../utils/api'
import { timeToString, timeToKey } from '../utils/helpers'
import { addCard } from '../actions/deckaction'

import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'


class SignInForm extends Component {

	constructor(props) {
    	super(props)
    		this.state = { 
    		pseudo : '', 
    		password : '',  
    	}
  	}
  
  
  ID = () => { return '_' + Math.random().toString(36).substr(2, 9); }
  
  
  	handleSignIn = async () => {
    
    const user = {
    	pseudo : this.state.pseudo, 
    	password : this.state.password,
    }
    
    var alreadyExists
    
    await AsyncStorage.getItem( 'users' )
    	.then( data => {
			data = JSON.parse( data );
			for (var key in data) {
    			if(data[key].pseudo === this.state.pseudo && data[key].password === this.state.password ){
					Alert.alert('Welcome back ' + this.state.pseudo + ' !' )
					this.props.navigation.navigate('TabNav', { pseudo : this.state.pseudo })
					return
				}
    		}
    		Alert.alert('those identifiers are not correct !')
    		
    	})
    
  }
  
  
  
  
  	renderSubmitButton = () => {
  
  	if(this.state.pseudo === '' || this.state.password === ''){
    	return(
    		<TouchableOpacity 
    			style={styles.forbiddenButton}
    			onPress={() => Alert.alert('Please fill in the form!!')}
    		>
      		<Text style={styles.buttonText}>Go to decks !</Text>
    		</TouchableOpacity>
    	)
    } else {
    	return(
    		<TouchableOpacity 
    			style={styles.button}
    			onPress={this.handleSignIn}
    		>
      		<Text style={styles.buttonText}>Go to decks !</Text>
    		</TouchableOpacity>
    	)
    }
  }
  
  
  
  
  render() {
  
  	
  	
  
    return (
    
      <View style={styles.container}>
      
      <View style={styles.newUserForm}>
        
        <Text style={styles.title}> Sign In </Text>
        
        
    	
    	<TextInput
          style={styles.deckInput}
          placeholder="Enter here your pseudo"
          onChangeText={(text) => this.setState({pseudo : text})}
        />
        
        <TextInput
          style={styles.deckInput}
          placeholder="Enter here your password"
          onChangeText={(text) => this.setState({password : text})}
        />
        
        
        {this.renderSubmitButton()}
        
    	
    	<TouchableOpacity 
    			style={styles.button}
    			onPress={() => this.props.navigation.navigate('AddUserForm')} 
    	>
      	<Text style={styles.buttonText}>Not registered ?</Text>
    	</TouchableOpacity>
        
        
    	
    	
    	</View>
        
        
      </View>
       
    );
  }
}



const styles = StyleSheet.create({
  container: {
  	flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  newUserForm: {
  	backgroundColor: 'powderblue',
  	borderRadius: 7,
    borderWidth: 1,
    borderColor: 'black',
  	alignItems: 'stretch',
  	margin : 20,
  },
  button: {
    margin : 10,
    backgroundColor: 'steelblue',
    padding : 10,
    borderRadius: 7,
  },
  forbiddenButton: {
    margin : 10,
    backgroundColor: 'red',
    padding : 10,
    borderRadius: 7,
  },
  deckInput : {
  	backgroundColor: 'white',
    borderRadius: 7,
    borderWidth: 1,
    borderColor: 'black',
    color : 'black',
    padding : 10,
    margin : 10,
  },
  title : {
    fontSize: 19,
    fontWeight: 'bold',
    margin : 10,
    alignSelf: 'center',
  },
  buttonText : {
  	alignSelf: 'center',
  	color : 'black',
  }
});





export default connect()(SignInForm)
















