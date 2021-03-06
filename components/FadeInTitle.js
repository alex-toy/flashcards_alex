import React from 'react';
import { Animated, Text, View } from 'react-native';

export default class FadeInTitle extends React.Component {
  state = {
    fadeAnim: new Animated.Value(0),  // Initial value for opacity: 0
  }

  componentDidMount() {
    Animated.timing(                  // Animate over time
      this.state.fadeAnim,            // The animated value to drive
      {
        toValue: 1,                   // Animate to opacity: 1 (opaque)
        duration: 5000,              // Make it take a while
      }
    ).start();                        // Starts the animation
  }

  render() {
    let { fadeAnim } = this.state;
    
    const { text } = this.props

    return (
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
      <Animated.View                 // Special animatable View
        
        style={{
          width: 250, height: 50, backgroundColor: 'powderblue',
          opacity: fadeAnim,         // Bind opacity to animated value
        }}
        
      >
        <Text style={{fontSize: 19, fontWeight: 'bold', textAlign: 'center', margin: 10}}>{text}</Text>
      </Animated.View>
      </View>
    );
  }
}























 
        
      