import React, { Component } from 'react'
import { View, Text, ActivityIndicator, TouchableOpacity, StyleSheet, Animated, TextInput, Alert } from 'react-native'
import { Foundation } from '@expo/vector-icons'
import { purple, white } from '../utils/colors'
import { Location, Permissions } from 'expo';
import { calculateDirection } from '../utils/helpers';
import { connect } from 'react-redux'
import { fetchDeckResults } from '../utils/api'
import { updateScoreDeck } from '../actions/deckaction'




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
  

  
  handleSubmit = (deckTitle, questionArray, arraycard, score, id) => {
  	var userAnswer = this.state.answer;
    var realAnswer = questionArray[this.state.cardNumber].answer
    if(userAnswer === realAnswer){
    	this.props.dispatch(updateScoreDeck({ title : this.state.deckName, currentScore : score, id : id }))
    	this.props.navigation.navigate('Answer',{ 
    		deckTitle : deckTitle,
    		id : id,
    		arraycard : arraycard,
    		length : questionArray.length,
    		goodAnswer : true,
    		cardNumber : this.state.cardNumber
    	})
    } else {
    	this.props.navigation.navigate('Answer',{ 
    		deckTitle : deckTitle,
    		id : id,
    		arraycard : arraycard,
    		length : questionArray.length,
    		goodAnswer : false,
    		cardNumber : this.state.cardNumber
    	})
    }
  }
  
  
  
  renderSubmitAnswerButton = (deckTitle, questionArray, arraycard, worth, id) => {
  
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
    			onPress={() => this.handleSubmit(deckTitle, questionArray, arraycard, worth, id)}
    		>
      		<Text> Submit answer </Text>
    		</TouchableOpacity>
    	)
    }
  }
  
  
  
  renderMoveNextButton = (length) => {
  
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
     
    var cardNumber = 0
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
  	const { deckTitle, cardNumber, id } = this.props.navigation.state.params
  	const arraydeck = Object.entries(decks)
  	
  	const arraycard = Object.entries(decks).filter( card => card[0] === id );
  	var questionArray = arraycard[0][1].questions
  	
  	var length = arraycard[0][1].questions.length
    
    return (
      <View style={styles.container}>
      
      
        <Text style={styles.title}>
        	<Text>Card number { this.state.cardNumber + 1 }</Text>{'\n'}
        </Text>
        
        <Text>
        	<Text>{length - this.state.cardNumber - 1} remaining questions</Text>{'\n'}
        	<Text>Question : {questionArray[this.state.cardNumber].question}</Text>{'\n'}
        	<Text>Question s worth : {questionArray[this.state.cardNumber].worth} points</Text>{'\n'}
        </Text>
        
        
        <TextInput
          style={styles.answerInput}
          placeholder="Enter here your answer"
          onChangeText={(text) => this.setState({answer : text})}
        />
        
        
        
        {this.renderSubmitAnswerButton(deckTitle, questionArray, arraycard, questionArray[this.state.cardNumber].worth, id)}
        
        
        {this.renderMoveNextButton(length)}
        
    	
    	
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
    decks : decks.deckreducer
  }
}


export default connect(
  mapStateToProps,
)(CardItem)





