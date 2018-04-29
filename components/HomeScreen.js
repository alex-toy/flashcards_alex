import React, { Component } from 'react'
import { View, Text, Button, ActivityIndicator, TouchableHighlight, TouchableOpacity, StyleSheet, Animated } from 'react-native'
import { Foundation } from '@expo/vector-icons'
import { purple, white } from '../utils/colors'
import { Location, Permissions } from 'expo';
import { calculateDirection } from '../utils/helpers';



import DeckStart from './DeckStart'



export default class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        
        <Text>Home Screen</Text>
        
        <Button
          title="Go to DetailsScreen"
          onPress={() => this.props.navigation.navigate('DetailsScreen')}
        />
        
        
         <Button
          title="Go to DeckList"
          onPress={() => this.props.navigation.navigate('DeckList')}
        />
        
        
        <DeckStart title='deck1' onPress={() => this.props.navigation.navigate('DeckList')} />
        <DeckStart title='deck2' onPress={() => this.props.navigation.navigate('DeckList')} />
        <DeckStart title='deck3' onPress={() => this.props.navigation.navigate('DeckList')} />
        <DeckStart title='deck4' onPress={() => this.props.navigation.navigate('DeckList')} />
        
        
        
      </View>
    );
  }
}


















