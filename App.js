import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import EventList from './EventList'
import EventForm from './EventForm'
import LoginForm from './LoginForm'
import {createStackNavigator, createAppContainer } from 'react-navigation';

const RootStack = createStackNavigator({
  login: {
    screen: LoginForm,
    navigationOptions: () => ({
      title: 'Your Events',
    })
  },
  list: {
    screen: EventList,
    navigationOptions: () => ({
      title: 'Your Events',
    })
  },
  form: {
    screen: EventForm,
    navigationOptions: () => ({
      title: 'Add new Events',
    })
  }
});

const App = createAppContainer(RootStack);

export default App;


