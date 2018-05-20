import React from 'react';
import { Button, View, Text } from 'react-native';
import { StackNavigator } from 'react-navigation';


import DeckList from '../DeckList'
import DeckItem from '../DeckItem'
import AddCardForm from '../AddCardForm'
import AddDeckForm from '../AddDeckForm'
import Quiz from '../Quiz'
import CardItem from '../CardItem'
import Answer from '../Answer'
import DisplayResults from '../DisplayResults'


import HomeScreen from '../HomeScreen'




const RootStack = StackNavigator(
  {
    
    DeckList: { screen: props => <DeckList {...props} /> },
    
    DeckItem: {
      screen: DeckItem,
    },
    AddCardForm: {
      screen: AddCardForm,
    },
    
    
    AddDeckForm: { screen: props => <AddDeckForm {...props} /> },
    

    Quiz: {
      screen: Quiz,
    },
    CardItem: {
      screen: CardItem,
    },
    Answer: {
      screen: Answer,
    },
    DisplayResults: {
      screen: DisplayResults,
    },
  },
  {
    initialRouteName: 'DeckList',
  }
);




export default class NavScreens extends React.Component {
  render() {
  
  	const { screenProps } = this.props
  
    return <RootStack screenProps={screenProps}  />;
  }
}






























