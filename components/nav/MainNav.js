import React, { Component } from 'react'
import { TabNavigator, StackNavigator } from 'react-navigation'
import { View, Platform, StatusBar } from 'react-native'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { purple, white, blue } from '../../utils/colors'

import DeckList from '../DeckList'
//import NewDeck from '../NewDeck'




const MainNavigator = StackNavigator({
  

  
  
  
  DeckList: {
    screen: DeckList,
  },
  
  
  
  
})



export default class MainNav extends Component {
  render() {
    return ( <MainNavigator />  )
  }
}











