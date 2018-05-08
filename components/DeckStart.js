import React, { Component } from 'react'
import { View, Text, Button, ActivityIndicator, TouchableHighlight, TouchableOpacity, StyleSheet, Animated } from 'react-native'
import { Foundation } from '@expo/vector-icons'
import { purple, white } from '../utils/colors'
import { Location, Permissions } from 'expo';
import { calculateDirection } from '../utils/helpers';
import { StackNavigator } from 'react-navigation';


import DeckItem from './DeckItem'





export default class DeckStart extends React.Component {
  render() {
  
  	const {postedOn, title, keynum} = this.props
  	//console.log("props : ", this.props)
  
    return (
      <View style={styles.container}>
        
        <Text style={styles.title}>
        <Button
          title={"Go to " + title}
          onPress={this.props.onPress}
        />
        </Text>
        
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
    padding: 20,
    margin: 5,
    textAlign : 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: 300
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'blue',
    padding: 10
  },
});










