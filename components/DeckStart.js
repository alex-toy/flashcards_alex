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
      <View style={styles.title}>
        
        
        <Button
          title={"Go to " + title}
          onPress={this.props.onPress}
        />
        
        
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
    fontWeight: 'bold',
    color: 'green',
    padding: 20,
    margin: 5,
    textAlign : 'center',
    borderRadius: 4,
    borderWidth: 3,
    borderColor: 'blue',
    width: 300
  },
  activeTitle: {
    color: 'red',
  },
  button: {
    alignItems: 'center',
    backgroundColor: 'blue',
    padding: 10
  },
  countContainer: {
    alignItems: 'center',
    padding: 10
  },
  countText: {
    color: '#FF00FF'
  }
});










