import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TabNavigator, TabBarBottom } from 'react-navigation';

import DeckList from '../DeckList'
import AddDeck from '../AddDeck'
import NavScreens from './NavScreens'
//import AddDeckFormTest from '../AddDeckFormTest'
import Results from '../Results'


const TabNavInit = TabNavigator(
  
  {
    DeckList: { screen: props => <NavScreens {...props} /> },
    
    AddDeck: { screen: props => <AddDeck {...props} /> },
    
    Results: { screen: props => <Results {...props} /> },
    
  },
  
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'DeckList') {
          iconName = `ios-options${focused ? '' : '-outline'}`;
        } else if (routeName === 'AddDeck') {
          iconName = `ios-information-circle${focused ? '' : '-outline'}`;
        } else if (routeName === 'NavScreens') {
          iconName = `ios-options${focused ? '' : '-outline'}`;
        } else if (routeName === 'Results') {
          iconName = `ios-options${focused ? '' : '-outline'}`;
        }

        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
    }),
    
    
    tabBarOptions: {
  		activeTintColor: 'blue',
  		inactiveTintColor: '#6D3C4F',
  		labelStyle: {
    	fontSize: 12,
  		},
  		style: {
    		backgroundColor: '#72B091',
  		},
  		initialRouteName : 'test',
	},
    
    
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,
  },
  
  
  
  
  
  
);




export default class TabNav extends React.Component {

  render() {
  
  const { pseudo } = this.props.navigation.state.params
  
    return ( 
    	
    <View style={styles.container}>
    	<TabNavInit 
    		screenProps={{ pseudo : pseudo, }}
    	/>
    </View>
    	
    	  
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  box: {
    height: 50,
    width: 50,
    backgroundColor: '#e76e63',
    margin: 10,
  }
})













