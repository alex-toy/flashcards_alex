import React from 'react'
import { TabNavigator, StackNavigator } from 'react-navigation'
import { View, Platform, StatusBar } from 'react-native'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { purple, white, blue } from '../../utils/colors'
import History from '../History'
import AddEntry from '../AddEntry'
import Live from '../Live'
import Tabs from './Tabs'
import EntryDetail from '../../components/EntryDetail'


const MainNavigator = StackNavigator({
  
  Home: { screen: Tabs },
  
  EntryDetail: {
    screen: EntryDetail,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: blue,
      }
    }
  }
})



const ModalNavigator = StackNavigator(
  {
    Home: { screen: Tabs },
   EntryDetail: {
    screen: EntryDetail,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: blue,
      }
    }
  }
  },
  {
    headerMode: 'none',
    mode: 'modal',
    navigationOptions: {
      gesturesEnabled: false,
    },
    transitionConfig: () => ({
      transitionSpec: {
        duration: 300,
        easing: Easing.out(Easing.poly(4)),
        timing: Animated.timing,
      },
      screenInterpolator: sceneProps => {
        const { layout, position, scene } = sceneProps;
        const { index } = scene;

        const height = layout.initHeight;
        const translateY = position.interpolate({
          inputRange: [index - 1, index, index + 1],
          outputRange: [height, 0, 0],
        });

        const opacity = position.interpolate({
          inputRange: [index - 1, index - 0.99, index],
          outputRange: [0, 1, 1],
        });

        return { opacity, transform: [{ translateY }] };
      },
    }),
  }
);



export default class MainNav extends React.Component {
  render() {
    return ( <ModalNavigator />  )
  }
}











