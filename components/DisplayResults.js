import React, { Component } from 'react'
import { View, Text, ActivityIndicator, TouchableOpacity, StyleSheet, Animated, Alert } from 'react-native'
import { Foundation } from '@expo/vector-icons'
import { purple, white } from '../utils/colors'
import { Location, Permissions } from 'expo';
import { calculateDirection } from '../utils/helpers';
import { receiveDecks, addDeck, resetDeckScore } from '../actions'

import { fetchCardResults } from '../utils/api'
import { connect } from 'react-redux'


class DisplayResults extends React.Component {
  
  constructor(props) {
    	super(props)
    	this.state = { cardNumber : 0,}
  	}
  
  
  	resetScore = () => {
  		var deckTitle = this.props.navigation.state.params.deckTitle
  		//console.log('deckTitle : ', deckTitle)
  		this.props.dispatch(resetDeckScore({ title : deckTitle }))
	}
	
	
	
	recordDayQuiz = () => {
  		var deckTitle = this.props.navigation.state.params.deckTitle
  		//console.log('deckTitle : ', deckTitle)
  		this.props.dispatch(resetDeckScore({ title : deckTitle }))
	}
	
	
  
  
  render() {
  
  	const { deckTitle} = this.props.navigation.state.params
    const { decks } = this.props
  	
  	const arraydeck = Object.entries(decks)
  	//console.log('arraydeck : ', arraydeck)
  	//console.log('cardNumber : ', this.state.cardNumber)
  	

  	const arraycards = Object.entries(decks).filter( card => card[1].title === deckTitle )[0][1];
  	console.log('arrayquestions : ', arraycards.questions)
  	
  	//var length = arraycard[0][1].questions.length
  	
  	const totalWorth = arraycards.questions.reduce((acc, currVal)=> acc + currVal.worth,0);
  	//console.log(totalWorth)
  	const percentage = Math.round(arraycards.currentScore / totalWorth *100) 
  	
  	var grading
  	if(percentage === 100){ grading = 'Brilliant !!' }
  	else if(percentage>80){ grading = 'Close to perfection !!' }
  	else if(percentage>60){ grading = 'Try to improve !!' }
  	else if(percentage>40){ grading = 'Not very good !!' }
  	else if(percentage>20){ grading = 'Back to Udacity lessons !!' }
  	else { grading = 'you performed bad !!' }
  	
    return (
      <View style={styles.container}>
     
      
        <Text style={styles.title}>
        	<Text>Results</Text>{'\n'}
        </Text>
        
        
        <Text style={styles.regularText}>
        	<Text>Your score is : {arraycards.currentScore}/{totalWorth}</Text>{'\n'}
        	<Text>Your percentage of successfulness is : {percentage} %</Text>{'\n'}
        	<Text>{grading}</Text>{'\n'}
        </Text>
        
        
        
        
        <TouchableOpacity 
    		style={styles.button}
    		onPress={() => {
    			this.resetScore()
    			this.setState({ cardNumber : this.state.cardNumber+1 }, function () {
    					this.props.navigation.navigate('CardItem', { 
    						cardNumber : 0,
    						deckTitle : deckTitle 
    					})
					});
				}
			}
    	>
      	<Text> Retry deck {deckTitle} </Text>
    	</TouchableOpacity>
    	
    	
    	
    	
    	<TouchableOpacity 
    		style={styles.button}
    		//onPress={() => { this.recordDayQuiz() }
    	>
      	<Text>Submit for today</Text>
    	</TouchableOpacity>
    	
    	
    	
    	
    	<TouchableOpacity 
    		style={styles.button}
    		onPress={() => {
    			this.resetScore()
    			this.setState({ cardNumber : this.state.cardNumber+1 }, function () {
    					this.props.navigation.navigate('DeckList')
					});
				}
			}
    	>
      	<Text> Go back to the decks </Text>
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
  regularText: {
    color: 'green',
    padding: 20,
    textAlign : 'left'
  },
});



function mapStateToProps (decks) {
  return {
    decks
  }
}
export default connect(
  mapStateToProps,
)(DisplayResults)





