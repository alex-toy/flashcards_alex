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


import HomeScreen from '../HomeScreen'




class DetailsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
      </View>
    );
  }
}



const RootStack = StackNavigator(
  {
    DetailsScreen: {
      screen: DetailsScreen,
    },
    DeckList: {
      screen: DeckList,
    },
    DeckItem: {
      screen: DeckItem,
    },
    AddCardForm: {
      screen: AddCardForm,
    },
    AddDeckForm: {
      screen: AddDeckForm,
    },
    Quiz: {
      screen: Quiz,
    },
    CardItem: {
      screen: CardItem,
    },
    Answer: {
      screen: Answer,
    },
  },
  {
    initialRouteName: 'DeckList',
  }
);




export default class NavScreens extends React.Component {
  render() {
    return <RootStack />;
  }
}






