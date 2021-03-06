import React, { Component } from 'react'
import { View, Platform, StatusBar, StyleSheet } from 'react-native'

import { Constants } from 'expo'
import MainNav from './components/nav/MainNav'
import TabNav from './components/nav/TabNav'
import MainNavScreens from './components/nav/MainNavScreens'

import { createStore } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './reducers/index'

import NavScreens from './components/nav/NavScreens'
import ModalExample from './components/ModalExample'


export default class App extends Component {
  render() {
    return (
      <Provider store={createStore(rootReducer)}>
        <View style={{ flex: 1, }}>
        
        <MainNavScreens />
          
          
        </View>
      </Provider>
    )
  }
}









