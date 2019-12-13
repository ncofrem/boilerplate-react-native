import React from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator, View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';
import jwt from 'jwt-decode';
import { MainLogo } from '../../components';
import { setInfoUser } from '../../actions/auth';

class SplashScreen extends React.Component {
  componentDidMount() {
    this.bootstrapAsync();
  }

  bootstrapAsync = async () => {
    const { navigation, dispatch } = this.props;
    const userJWT = await AsyncStorage.getItem('jwt');
    if (userJWT) {
      dispatch(setInfoUser(jwt(userJWT)));
      navigation.navigate('App');
    } else {
      navigation.navigate('Auth');
    }
  };

  render() {
    return (
      <View>
        <MainLogo />
        <ActivityIndicator />
      </View>
    );
  }
}

const propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }).isRequired
};

SplashScreen.propTypes = propTypes;

const mapStateToProps = state => {
  const { signedIn, navigateTo } = state.auth;
  return { signedIn, navigateTo };
};

export default connect(mapStateToProps)(SplashScreen);
