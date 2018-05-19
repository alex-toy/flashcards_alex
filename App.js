import React, { Component } from 'react'
import { View, Platform, StatusBar, StyleSheet } from 'react-native'

//import { TabNavigator, StackNavigator } from 'react-navigation'
//import { purple, white } from './utils/colors'
//import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { Constants } from 'expo'
import MainNav from './components/nav/MainNav'
import TabNav from './components/nav/TabNav'

import { createStore } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './reducers/index'

import NavScreens from './components/nav/NavScreens'



export default class App extends Component {
  render() {
    return (
      <Provider store={createStore(rootReducer)}>
        <View style={{flex: 1}}>
          
          
        <TabNav />
          
          
        </View>
      </Provider>
    )
  }
}









