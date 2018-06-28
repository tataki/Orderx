import React from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import { Provider } from 'react-redux';
import store from './store/index';
import Router from './router/index';

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router/>
      </Provider>
    );
  }
}
