import React, { Component } from 'react'
import { View, Text, ActivityIndicator, TouchableOpacity, StyleSheet, Animated, Alert, AsyncStorage } from 'react-native'
import { Foundation } from '@expo/vector-icons'
import { purple, white } from '../utils/colors'
import { Location, Permissions } from 'expo';
import { calculateDirection } from '../utils/helpers';
//import { updateScoreDeck } from '../actions'
import { addResult } from '../actions/resultaction'
import { addDeck, resetDeckScore, updateScoreDeck } from '../actions/deckaction'
//import { fetchCardResults } from '../utils/api'
import { connect } from 'react-redux'


class DisplayResults extends React.Component {
  
  constructor(props) {
    	super(props)
    	this.state = { cardNumber : 0,}
  	}


  	recordScore = async (title, score) => {
  	
  		AsyncStorage.getItem( 'decks_v1' )
    	.then( data => {
			data = JSON.parse( data );
    		for (var key in data) {
    
    			if (!data.hasOwnProperty(key)) continue;
				if(data[key].title === title){
					data[key].currentScore = score
				}
    		}
    	AsyncStorage.setItem( 'decks_v1', JSON.stringify( data ) );

    	})
  		//.then( () => this.props.dispatch(updateScoreDeck({ title : title })) )
  		.then( () => updateScoreDeck(title) )
  		.done()
  		
  		//updateScoreDeck(title)
  		
	}
	
	
	
	
	handleresetDeckScore = async (id) => {
  	console.log(id)
  		AsyncStorage.getItem( 'decks_v1' )
    	.then( data => {
			data = JSON.parse( data );
			console.log(data)
    		for (var key in data) {
    			if(key === id){
					console.log(data[key])
					data[key].currentScore = 0
					data[key].score = 0
				}
    		}
    		console.log(data)
      		AsyncStorage.setItem( 'decks_v1', JSON.stringify(data) );

    	})
    	.then( () => this.props.resetDeckScore(id) )
    	.done();
  		
	}
	
	
	
	ID = () => { return '_' + Math.random().toString(36).substr(2, 9); }
	
	recordDayQuiz = async (title, score, totalWorth) => {
  		
  		var data = {
  			datetime : new Date(),
  			score : score,
  			deckTitle : title,
  			totalWorth : totalWorth,
  			pseudo : this.props.screenProps.pseudo
  		}
  		
  		var result = { [this.ID()] : data }
  		
  		
  		await AsyncStorage.mergeItem( 'results_v1', JSON.stringify( result ) )
  		.then( () => this.props.addResult(result) )
    	.done();
    	
	}
	
	
  
  
  render() {
  
  	const { deckTitle, id} = this.props.navigation.state.params
    const { decks, screenProps } = this.props
    
    const arraydeck = Object.entries(decks)
  	const arraycards = Object.entries(decks).filter( card => card[0] === id )[0][1];
  	const totalWorth = arraycards.questions.reduce((acc, currVal)=> acc + currVal.worth,0);
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
    			this.handleresetDeckScore(id)
    			this.setState({ cardNumber : this.state.cardNumber+1 }, function () {
    					this.props.navigation.navigate('CardItem', { 
    						cardNumber : 0,
    						deckTitle : deckTitle,
    						id : id
    					})
					});
				}
			}
    	>
      	<Text> Retry deck {deckTitle} </Text>
    	</TouchableOpacity>
    	
    	
    	
    	
    	<TouchableOpacity 
    		style={styles.button}
    		onPress={() => this.recordDayQuiz(deckTitle, arraycards.currentScore, totalWorth) }
    	>
      	<Text>Submit for today</Text>
    	</TouchableOpacity>
    	
    	
    	
    	
    	<TouchableOpacity 
    		style={styles.button}
    		onPress={() => {
    			//this.resetScore()
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
    decks : decks.deckreducer
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
  	addResult : (result) => {dispatch( addResult(result) )}, 
  	resetDeckScore : (id) => {dispatch( resetDeckScore({ id : id }) )}, 
  	updateScoreDeck : (title) => {dispatch( updateScoreDeck({ title : title }) )}, 
  	
  	}
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DisplayResults)





