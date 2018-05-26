import React, { Component } from 'react';
import { AppRegistry, View, Image, StyleSheet, Animated, Text, TouchableOpacity } from 'react-native';
var Dimensions = require('Dimensions');



export default class DisplayAnImageWithStyle extends Component {
  
  state = {
    fadeAnim: new Animated.Value(0),  
    	width: new Animated.Value(0),  
    	height: new Animated.Value(0),  
    	twirl: new Animated.Value(0),
    	pan: new Animated.ValueXY(),
  }
  

  componentDidMount() {
    
    var SPRING_CONFIG = {tension: 2, friction: 3};
    var { width, height } = Dimensions.get('window');
    var SQUARE_DIMENSIONS = 30;
    
    Animated.sequence([
  		
  		Animated.parallel([ 
  			Animated.timing( this.state.fadeAnim,{ toValue: 1,  duration: 5000, } ),
  			//Animated.spring( this.state.width, { toValue: 200, speed : 5 }),
			//Animated.spring( this.state.height, { toValue: 200, speed : 5 }),
			
			
			//Animated.spring(this.state.pan, { ...SPRING_CONFIG, toValue: {x: 0, y: height - SQUARE_DIMENSIONS} })
			
			
			
			
  		]),
  		
  		Animated.timing( this.state.twirl, { toValue: 360, speed : 5 }),
  		
	
	]).start()
    
  }
  
  
  
  
  render() {
  
  let { fadeAnim, width, height, twirl } = this.state;
  
    return (
      
      <View style={styles.container}>
      
      <Animated.View                 
        style={{
          flex: 1, alignItems: 'center', justifyContent: 'center',
          opacity: fadeAnim,         
        }}
      >
      
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center',}}>
        <Image
          style={width, height, twirl}
          source={require('./flashcards.png')}
        />
      </View>
      </Animated.View>
      
      
      
      	<TouchableOpacity 
    			style={styles.button}
    			onPress={() => { this.props.navigation.navigate('AddUserForm') }}
    		>
      		<Text>Move to flashcards</Text>
    	</TouchableOpacity>
      
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
  animation :{
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center',        
	},
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    margin : 10
  },
  square: {
    width: 30,
    height: 30,
    backgroundColor: 'blue'
  } 
  
  
});



style={}
















