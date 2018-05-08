import React, { Component } from 'react'
import { View, Text, ActivityIndicator, TouchableOpacity, StyleSheet, Animated, TextInput, Alert } from 'react-native'
import { Foundation } from '@expo/vector-icons'
import { purple, white } from '../utils/colors'
import { Location, Permissions } from 'expo';
import { calculateDirection } from '../utils/helpers';
import { connect } from 'react-redux'
import { fetchDeckResults } from '../utils/api'
import { updateScoreDeck, receiveDecks } from '../actions'


import AddCard from './AddCard'


class CardItem extends React.Component {

	constructor(props) {
    	super(props)
    	this.state = { 
    		cardNumber : 0,
  			deckName : '',
  			length : 0,
  			answer : ''
    	}
  	}
  

  
  handleSubmit = (deckTitle, questionArray, arraycard, score) => {
  	var userAnswer = this.state.answer;
    console.log(userAnswer)
    var realAnswer = questionArray[this.state.cardNumber].answer
    console.log(realAnswer)
    if(userAnswer === realAnswer){
    	console.log('this.state.deckName : ', this.state.deckName)
    	this.props.dispatch(updateScoreDeck({ title : this.state.deckName, currentScore : score }))
    	this.props.navigation.navigate('Answer',{ 
    		deckTitle : deckTitle,
    		arraycard : arraycard,
    		length : questionArray.length,
    		goodAnswer : true,
    		cardNumber : this.state.cardNumber
    	})
    } else {
    	console.log('update deck')
    	this.props.navigation.navigate('Answer',{ 
    		deckTitle : deckTitle,
    		arraycard : arraycard,
    		length : questionArray.length,
    		goodAnswer : false,
    		cardNumber : this.state.cardNumber
    	})
    }
  }
  
  
  
  renderSubmitAnswerButton = (deckTitle, questionArray, arraycard, worth) => {
  
  	if(this.state.answer === ''){
    	return(
    		<TouchableOpacity 
    			style={styles.forbiddenButton}
    			onPress={() => Alert.alert('Tu dois au moins tenter une réponse, crétin!!')}
    		>
      		<Text>Submit answer</Text>
    		</TouchableOpacity>
    	)
    } else {
    	return(
    		<TouchableOpacity 
    			style={styles.button}
    			onPress={() => this.handleSubmit(deckTitle, questionArray, arraycard, worth)}
    		>
      		<Text> Submit answer </Text>
    		</TouchableOpacity>
    	)
    }
  }
  
  
  
  renderMoveNextButton = () => {
  
  	if(this.state.answer === ''){
    	return(
    		<TouchableOpacity 
    			style={styles.forbiddenButton}
    			onPress={() => Alert.alert('Tu dois au moins tenter une réponse, crétin!!')}
    		>
      		<Text> Move to next question </Text>
    		</TouchableOpacity>
    	)
    } else {
    	return(
    		<TouchableOpacity 
    			style={styles.button}
    			onPress={() => {
    			this.setState({ cardNumber : this.state.cardNumber<length-1 ? this.state.cardNumber+1 : 0 })
    			}}
    		>
      		<Text> Move to next question </Text>
    		</TouchableOpacity>
    	)
    }
  }
  
  
  
  componentDidMount () {
    
    const { dispatch } = this.props
	fetchDeckResults()
      .then((entries) => dispatch(receiveDecks(entries)))
      .catch(function(error) {
		console.log('There has been a problem with your fetch operation: ' + error.message);
  		throw error;
		})
      
      
      
    var cardNumber = 0
    console.log(this.props.navigation.state.params.cardNumber)
    if(this.props.navigation.state.params.cardNumber !== undefined){
    	cardNumber = this.props.navigation.state.params.cardNumber
    }
      
    this.setState({
  		cardNumber : cardNumber,
  		deckName : this.props.navigation.state.params.deckTitle,
  	})
      
  }
  
  
  
  
  render() {
  
  	const { decks } = this.props
  	const { deckTitle, cardNumber } = this.props.navigation.state.params
  	const arraydeck = Object.entries(decks)
  	//console.log('cardNumber : ', cardNumber)
  	
  	const arraycard = Object.entries(decks).filter( card => card[1].title === deckTitle );
  	//console.log('arraycard : ', arraycard)
  	var questionArray = arraycard[0][1].questions
  	
  	var length = arraycard[0][1].questions.length
  	//console.log(answerArray)
  	//console.log(this.state.cardNumber)
  	
    
    
    return (
      <View style={styles.container}>
      
      
        <Text style={[styles.title, this.props.isActive && styles.activeTitle]}>
        	<Text>Card number { this.state.cardNumber + 1 }</Text>{'\n'}
        </Text>
        
        <Text>
        	<Text>{length - this.state.cardNumber - 1} remaining questions</Text>{'\n'}
        	<Text>Question : {questionArray[this.state.cardNumber].question}</Text>{'\n'}
        	<Text>Question s worth : {questionArray[this.state.cardNumber].worth}</Text>{'\n'}
        </Text>
        
        
        <TextInput
          style={styles.answerInput}
          placeholder="Enter here your answer"
          onChangeText={(text) => this.setState({answer : text})}
        />
        
        
        
        {this.renderSubmitAnswerButton(deckTitle, questionArray, arraycard, questionArray[this.state.cardNumber].worth)}
        
        
        {this.renderMoveNextButton()}
        
    	
    	
    	<TouchableOpacity 
    		style={styles.button}
    		onPress={() => 
    			{
    			this.setState({ cardNumber : this.state.cardNumber>0 ? this.state.cardNumber-1 : length-1 })
    			}
    		}
    	>
      	<Text> Move to preceding question </Text>
    	</TouchableOpacity>
    	
    	
    	
        
        
      </View>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    borderRadius: 4,
    borderWidth: 0.5,
    margin : 10,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 19,
    fontWeight: 'bold',
    color: 'green',
    padding: 20,
    textAlign : 'center'
  },
  activeTitle: {
    color: 'red',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    margin : 10
  },
  answerInput : {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    margin : 10,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: 'black',
  },
  forbiddenButton: {
    alignItems: 'center',
    textAlign : 'center',
    backgroundColor: 'red',
    padding: 10,
    margin : 10
  },
});


function mapStateToProps (decks) {
  return {
    decks
  }
}
export default connect(
  mapStateToProps,
)(CardItem)





