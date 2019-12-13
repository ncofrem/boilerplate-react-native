import React from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import RootStack from './config/routes';
import { Alert } from './components';
import store from './config/store';
import './assets/styles/application';

const App = () => ({
  render() {
    StatusBar.setBarStyle('light-content', true);
    return (
      <Provider store={store}>
        <RootStack />
        <Alert />
      </Provider>
    );
  }
});

App.prototype = React.Component.prototype;

export default App;
