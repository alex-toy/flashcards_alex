import React, { Component } from 'react';
import { View, StyleSheet, Button, Alert, TouchableOpacity, Text, TextInput, ScrollView, AsyncStorage } from 'react-native';
import { submitEntryCard, removeDeck } from '../utils/api'
import { timeToString, timeToKey } from '../utils/helpers'
import { addUser } from '../actions/useraction'

import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'

import ModalInput from './ModalInput'
import FadeInTitle from './FadeInTitle'


class AddUserForm extends Component {

	constructor(props) {
    	super(props)
    		this.state = { 
    		pseudo : '', 
    		password : '',
    		modalVisible : false,
    		modalMessage : '',
    	}
  	}
  	
  	
  	setModalVisible(visible) {
    	this.setState({modalVisible: visible});
  	}
  	
	
	ID = () => { return '_' + Math.random().toString(36).substr(2, 9); }
  
  
  	handleAddUser = async () => {
    
    const user = {
    	pseudo : this.state.pseudo, 
    	password : this.state.password,
    }
    
    var alreadyExists = false
    
    await AsyncStorage.getItem( 'users' )
    	.then( data => {
			data = JSON.parse( data );
			for (var key in data) {
    			if(data[key].pseudo === this.state.pseudo){
					Alert.alert('This pseudo already exists !')
					alreadyExists = true
					return
				}
    		}
    		Alert.alert('Welcome ' + this.state.pseudo + ' !' )
    	})
    
	if(!alreadyExists){
		var useritem = { [this.ID()] : user }
    
		await AsyncStorage.mergeItem( 'users', JSON.stringify( useritem ) )
  			.then( () => this.props.addUser(useritem) )
    		.done();
    	
    	this.props.navigation.navigate('TabNav', { pseudo : this.state.pseudo })
    	//this.props.navigation.navigate('DeckList', { pseudo : this.state.pseudo })
	}
    
    
  }
  
  
  
  
  	renderSubmitButton = () => {
  
  	if(this.state.pseudo === '' || this.state.password === ''){
    	return(
    		<TouchableOpacity 
    			style={styles.forbiddenButton}
    			onPress={() => {
    				this.setModalVisible(true)
    				this.setState({ modalMessage : 'Please fill in the form!!' })
    			}}
    		>
      		<Text style={styles.buttonText}>Add new user</Text>
    		</TouchableOpacity>
    	)
    } else {
    	return(
    		<TouchableOpacity 
    			style={styles.button}
    			onPress={this.handleAddUser}
    		>
      		<Text style={styles.buttonText}>Add new user</Text>
    		</TouchableOpacity>
    	)
    }
  }
  
  
  
  render() {
  
  	return (
      
      <View style={styles.container}>
      
        
        
        <View style={styles.newUserForm}>
        	
        	
        	
        	<FadeInTitle 
        		style={styles.title}
        		text='Sign up as a new user' 
        	/>
        
    	
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
    			onPress={() => this.props.navigation.navigate('SignInForm')} 
    		>
      		<Text style={styles.buttonText}>Already registered ?</Text>
    		</TouchableOpacity>
    		
    		
    		<ModalInput 
    			modalVisible={this.state.modalVisible} 
    			message={this.state.modalMessage} 
    		/>
    		
        
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





const mapDispatchToProps = (dispatch) => {
  return {
  	addUser : (user) => {dispatch( addUser(user) )}, 
  	}
}



export default connect(null, mapDispatchToProps)(AddUserForm)













