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
      		<Text>Go to decks !</Text>
    		</TouchableOpacity>
    	)
    } else {
    	return(
    		<TouchableOpacity 
    			style={styles.button}
    			onPress={this.handleSignIn}
    		>
      		<Text>Go to decks !</Text>
    		</TouchableOpacity>
    	)
    }
  }
  
  
  
  
  render() {
  
  	
  	
  
    return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      <View style={styles.container}>
        
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
      	<Text>Not registered ?</Text>
    	</TouchableOpacity>
        
        
    	
    	
    	
        
        
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




export default connect()(SignInForm)
















