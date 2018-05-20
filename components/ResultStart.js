import React, { Component } from 'react'
import { View, Text, Button, ActivityIndicator, TouchableHighlight, TouchableOpacity, StyleSheet, Animated, AsyncStorage } from 'react-native'
import { Foundation } from '@expo/vector-icons'
import { purple, white } from '../utils/colors'
import { Location, Permissions } from 'expo';
import { calculateDirection } from '../utils/helpers';
import { StackNavigator } from 'react-navigation';
import { removeResult, resultlist } from '../actions/resultaction'
import { connect } from 'react-redux'


class ResultStart extends React.Component {


	handleRemoveResult = async (id) => {
  		AsyncStorage.getItem( 'results_v1' )
    		.then( data => {
				data = JSON.parse( data )
				data[id] = undefined
				delete data[id]
      			AsyncStorage.setItem( 'results_v1', JSON.stringify( data ) );
    	})
    	.then( this.props.removeResult(id) )
    	.done();
  		
	}
	
	
	
	


  render() {
  
  	const {title, date, score, totalWorth, id} = this.props
  	const mydate = new Date(date)
  	const formatedDate = mydate.getMonth() + '/' + mydate.getMonth() + '/' + mydate.getFullYear()
  	const formatedHour = mydate.getHours() + ':' + mydate.getMinutes()
  	
  	
  
    return (
      <View style={styles.container}>
        
        <Text style={styles.title}>
        	Deck : {title}{'\n'}
        	submited on {formatedDate} at {formatedHour} {'\n'}
        	you performed : {score} / {totalWorth}
        </Text>
        
        
        <TouchableOpacity 
    		style={styles.button}
    		onPress={() => this.handleRemoveResult(id)} 
    	>
      	<Text> Remove result </Text>
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
    borderRadius: 4,
    borderWidth: 3,
    borderColor: 'blue',
  },
  title: {
    fontWeight: 'bold',
    color: 'green',
    padding: 7,
    margin: 5,
    textAlign : 'left',
    alignItems: 'center',
    justifyContent: 'center',
    width: 200
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'blue',
    padding: 10
  },
});



function mapStateToProps (decks) {
  return {
    decks
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
  	removeResult : (id) => {dispatch( removeResult(id) )}, 
  	}
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResultStart)




























