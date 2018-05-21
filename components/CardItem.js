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
      		<Text style={styles.buttonText}>Submit answer</Text>
    		</TouchableOpacity>
    	)
    } else {
    	return(
    		<TouchableOpacity 
    			style={styles.button}
    			onPress={() => this.handleSubmit(deckTitle, questionArray, arraycard, worth, id)}
    		>
      		<Text style={styles.buttonText}> Submit answer </Text>
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
      		<Text style={styles.buttonText}> Move to next question </Text>
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
      		<Text style={styles.buttonText}> Move to next question </Text>
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
      <View style={styles.newUserForm}>
      
        <Text style={styles.title}>
        	<Text>Card number { this.state.cardNumber + 1 }</Text>{'\n'}
        </Text>
        
        <Text style={styles.buttonText}>
        	<Text>{length - this.state.cardNumber } remaining questions</Text>{'\n'}
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
      	<Text style={styles.buttonText}> Move to preceding question </Text>
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
  answerInput : {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    margin : 10,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: 'black',
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



function mapStateToProps (decks) {
  return {
    decks : decks.deckreducer
  }
}


export default connect(
  mapStateToProps,
)(CardItem)





