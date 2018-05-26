import React, { Component } from 'react';
import { Button, View, Text } from 'react-native';
//import { StackNavigator, createStackNavigator } from 'react-navigation';
import { StackNavigator, createSwitchNavigator, createStackNavigator, SwitchNavigator } from 'react-navigation';

import AddUserForm from '../AddUserForm'
import TabNav from './TabNav'
import SignInForm from '../SignInForm'
import DeckList from '../DeckList'
import DisplayAnImageWithStyle from '../DisplayAnImageWithStyle'
import InitialAnimation from '../InitialAnimation'


const AuthScreens = SwitchNavigator(
  {
    AddUserForm : AddUserForm,
    SignInForm : SignInForm,
    TabNav : TabNav,
    DisplayAnImageWithStyle : DisplayAnImageWithStyle,
	InitialAnimation : InitialAnimation
    
  },
  {
    initialRouteName: 'DisplayAnImageWithStyle',
  }
);



export default class MainNavScreens extends React.Component {
  render() {
    return(
    	<AuthScreens />
    );
  }
}






