import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Root } from 'native-base';
import { Provider } from 'react-redux';
import store from './store/index';
import Router from './router/index';
import { AppLoading } from 'expo';
export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true
    };
  }
  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: require('./native-base-theme/Fonts/Roboto.ttf'),
      Roboto_medium: require('./native-base-theme/Fonts/Roboto_medium.ttf')
    });
    this.setState({
      loading: false
    });
  }
  render() {
    if (this.state.loading) {
      return (
        <Root>
          <AppLoading />
        </Root>
      );
    } else {
      return (
        <Provider store={store}>
          <Router />
        </Provider>
      );
    }
  }
}
