import React, { Component } from 'react'
import { View, Text, ActivityIndicator, TouchableOpacity, StyleSheet, Animated, Alert } from 'react-native'
import { Foundation } from '@expo/vector-icons'
import { purple, white } from '../utils/colors'
import { Location, Permissions } from 'expo';
import { calculateDirection } from '../utils/helpers';


import { fetchCardResults } from '../utils/api'
import { connect } from 'react-redux'


class Answer extends React.Component {
  
  constructor(props) {
    	super(props)
    	this.state = { cardNumber : 0,}
  	}
  
  
  seeAnswer = (answer) => {
  	Alert.alert('the answer was : ', answer)
  }
  
  
  
  componentDidMount () {
      
  
    this.setState({
  		cardNumber : this.props.navigation.state.params.cardNumber
  	})
      
  }
  
  
  
  render() {
  
  	const { deckTitle, goodAnswer, cardNumber } = this.props.navigation.state.params
    const { decks } = this.props
  	
  	const arraydeck = Object.entries(decks)
  	//console.log('arraydeck : ', arraydeck)
  	//console.log('cardNumber : ', this.state.cardNumber)
  	

  	const arraycard = Object.entries(decks).filter( card => card[1].title === deckTitle );
  	//console.log('arraycard : ', arraycard)
  	
  	var length = arraycard[0][1].questions.length
  	
  	
  	var question = arraycard[0][1].questions[cardNumber].question
  	var answer = arraycard[0][1].questions[cardNumber].answer
  	//console.log(answer)
  	
  	var feedback = goodAnswer ? "Good answer !!" : "Wrong answer !!"
  
  	
    return (
      <View style={styles.container}>
      
      
        <Text style={styles.title}>
        	<Text>{feedback}</Text>{'\n'}
        	
        </Text>
        
        
        <TouchableOpacity 
    		style={styles.button}
    		onPress={() => this.seeAnswer(answer)}
    	>
      	<Text> See answer </Text>
    	</TouchableOpacity>
    	
    	
    	<TouchableOpacity 
    		style={styles.button}
    		onPress={() => 
    			{
    			if(this.state.cardNumber === length-1){
					this.props.navigation.navigate('DisplayResults', {deckTitle : deckTitle})
    			} else if(this.state.cardNumber<length-1){
					this.setState({ cardNumber : this.state.cardNumber+1 }, function () {
    					this.props.navigation.navigate('CardItem', { 
    						cardNumber : this.state.cardNumber,
    						deckTitle : deckTitle 
    					})
					});
    			} else {
    				this.setState({ cardNumber : 0 }, function () {
    					this.props.navigation.navigate('CardItem', { 
    						cardNumber : this.state.cardNumber,
    						deckTitle : deckTitle 
    					})
					});
    			}
    			
    			}
    		}
    	>
      	<Text>{ (this.state.cardNumber === length-1)? 'See your results' : 'Move to next question' }  </Text>
    	</TouchableOpacity>
    	
    	
    	<TouchableOpacity 
    		style={styles.button}
    		onPress={() => 
    			{
    			this.setState({ cardNumber : this.state.cardNumber>0 ? this.state.cardNumber-1 : length-1 })
    			this.props.navigation.navigate('CardItem', { 
    				cardNumber : this.state.cardNumber,
    				deckTitle : deckTitle 
    			})
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
});



function mapStateToProps (decks) {
  return {
    decks
  }
}
export default connect(
  mapStateToProps,
)(Answer)





