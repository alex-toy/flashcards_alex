import React, { Component } from 'react';
import { Button, View, Text } from 'react-native';
//import { StackNavigator, createStackNavigator } from 'react-navigation';
import { StackNavigator, createSwitchNavigator, createStackNavigator, SwitchNavigator } from 'react-navigation';

import AddUserForm from '../AddUserForm'
import TabNav from './TabNav'
import SignInForm from '../SignInForm'
import DeckList from '../DeckList'



const AuthScreens = SwitchNavigator(
  {
    AddUserForm : AddUserForm,
    SignInForm : SignInForm,
    TabNav : TabNav,
  },
  {
    initialRouteName: 'AddUserForm',
  }
);



export default class MainNavScreens extends React.Component {
  render() {
    return(
    	<AuthScreens />
    );
  }
}






