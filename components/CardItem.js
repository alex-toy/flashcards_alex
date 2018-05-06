import React, { Component } from 'react'
import { View, Text, ActivityIndicator, TouchableOpacity, StyleSheet, Animated } from 'react-native'
import { Foundation } from '@expo/vector-icons'
import { purple, white } from '../utils/colors'
import { Location, Permissions } from 'expo';
import { calculateDirection } from '../utils/helpers';
import { connect } from 'react-redux'
import { fetchDeckResults } from '../utils/api'

import AddCard from './AddCard'

import t from 'tcomb-form-native'; // 0.6.9

const Form = t.form.Form;

const deck = t.struct({
  Answer: t.String,
});


class CardItem extends React.Component {
  
  state = { 
  	cardNumber : 0,
  	deckTitle : '',
  	length : 0,
  }
  
  
  handleSubmit = (deckTitle, questionArray, arraycard) => {
  	var userAnswer = this._form.getValue().Answer;
    console.log(userAnswer)
    var realAnswer = questionArray[this.state.cardNumber].answer
    console.log(realAnswer)
    userAnswer === realAnswer
    ? this.props.navigation.navigate('Answer',{ 
    	deckTitle : deckTitle,
    	arraycard : arraycard,
    	length : questionArray.length,
    	goodAnswer : true,
    	cardNumber : this.state.cardNumber
    	})
    : this.props.navigation.navigate('Answer',{ 
    	deckTitle : deckTitle,
    	arraycard : arraycard,
    	length : questionArray.length,
    	goodAnswer : false,
    	cardNumber : this.state.cardNumber
    	})
  }
  
  
  
  
  
  componentDidMount () {
    
    const { dispatch } = this.props
	fetchDeckResults()
      .then((entries) => dispatch(receiveDecks(entries)))
      
    var cardNumber = 0
    console.log(this.props.navigation.state.params.cardNumber)
    if(this.props.navigation.state.params.cardNumber !== undefined){
    	cardNumber = this.props.navigation.state.params.cardNumber
    }
      
    this.setState({
  		cardNumber : cardNumber,
  		deckTitle : this.props.navigation.state.params.deckTitle,
  	})
      
  }
  
  
  
  
  render() {
  
  	const { decks } = this.props
  	const { deckTitle, cardNumber } = this.props.navigation.state.params
  	const arraydeck = Object.entries(decks)
  	//console.log('cardNumber : ', cardNumber)
  	
  	const arraycard = Object.entries(decks).filter( card => card[1].title === deckTitle );
  	console.log('arraycard : ', arraycard)
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
        	<Text>Question : {questionArray[this.state.cardNumber].question}</Text>{'\n'}
        </Text>
        
        <Form 
          ref={c => this._form = c} // assign a ref
          type={deck} 
        />
        
        <TouchableOpacity 
    		style={styles.button}
    		onPress={() => this.handleSubmit(deckTitle, questionArray, arraycard)}
    	>
      	<Text> Submit answer </Text>
    	</TouchableOpacity>
    	
    	
    	<TouchableOpacity 
    		style={styles.button}
    		onPress={() => 
    			{
    			this.setState({ cardNumber : this.state.cardNumber<length-1 ? this.state.cardNumber+1 : 0 })
    			}
    		}
    	>
      	<Text> Move to next question </Text>
    	</TouchableOpacity>
    	
    	
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
    borderColor: '#d6d7da',
    margin : 10
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
});


function mapStateToProps (decks) {
  return {
    decks
  }
}
export default connect(
  mapStateToProps,
)(CardItem)





