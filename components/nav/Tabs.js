import React, { Component } from 'react'
import { TabNavigator, StackNavigator } from 'react-navigation'
import { View, Platform, StatusBar } from 'react-native'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { purple, white, red } from '../../utils/colors'


import NewDeck from '../NewDeck'
import DeckList from '../DeckList'



const Nav = TabNavigator({
  
  
  
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'DeckList',
      tabBarIcon: ({ tintColor }) => <Ionicons name='ios-speedometer' size={30} color={tintColor} />
    }
  },
  
  
  
  NewDeck: {
    screen: NewDeck,
    navigationOptions: {
      tabBarLabel: 'NewDeck',
      tabBarIcon: ({ tintColor }) => <Ionicons name='ios-speedometer' size={30} color={tintColor} />
    }
  },
  
  
  
  
  
  




}, 


{
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? purple : white,
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? white : purple,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 4
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
})



export default class Tabs extends Component {
  render() {
    return ( <Nav />  )
  }
}











