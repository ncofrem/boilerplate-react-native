import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import * as screens from '../screens';
import {
  appTabNavigatorOptions,
  headerNavigationOptions
} from './navigatorOptions';

const HomeStack = createStackNavigator(
  {
    Home: {
      screen: screens.HomeScreen
    },
    Edit: {
      screen: screens.ProfileScreen
    }
  },
  {
    initialRouteName: 'Home',
    navigationOptions: headerNavigationOptions
  }
);

const ProfileStack = createStackNavigator(
  {
    Profile: {
      screen: screens.ProfileScreen
    }
  },
  {
    initialRouteName: 'Profile',
    navigationOptions: headerNavigationOptions
  }
);

const AppStack = createBottomTabNavigator(
  {
    Home: {
      screen: HomeStack,
      navigationOptions: appTabNavigatorOptions.home
    },
    Perfil: {
      screen: ProfileStack,
      navigationOptions: appTabNavigatorOptions.profile
    }
  },
  appTabNavigatorOptions.general
);

const AuthStack = createStackNavigator(
  {
    Login: screens.LoginScreen
  },
  { initialRouteName: 'Login' }
);

const AppContainer = createSwitchNavigator(
  {
    Splash: screens.SplashScreen,
    App: AppStack,
    Auth: AuthStack
  },
  { initialRouteName: 'Splash' }
);

export default createAppContainer(AppContainer);
