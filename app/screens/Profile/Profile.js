import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import styles from './styles';
import { signOut } from '../../actions/auth';
import { DefaultButton } from '../../components';
import AlertHelper from '../../services/AlertHelper';

class ProfileScreen extends React.Component {
  componentDidUpdate() {
    const { notice } = this.props;
    if (notice.message !== '') {
      AlertHelper.show(notice.kind, notice.title, notice.message);
    }
  }

  signOut = () => {
    const { dispatch, navigation } = this.props;
    dispatch(signOut());
    navigation.navigate('Auth');
  };

  render() {
    const { user } = this.props;
    return (
      <View style={styles.container}>
        <Text>{user.email}</Text>
        <DefaultButton title="CERRAR SESIÓN" onPress={this.signOut} />
      </View>
    );
  }
}

const propTypes = {
  notice: PropTypes.shape({
    title: PropTypes.string,
    kind: PropTypes.string,
    message: PropTypes.string
  }),
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
  user: PropTypes.shape({
    email: PropTypes.string
  })
};

const defaultProps = {
  notice: {
    title: '',
    kind: '',
    message: ''
  },
  user: {
    email: ''
  }
};

ProfileScreen.propTypes = propTypes;
ProfileScreen.defaultProps = defaultProps;

const mapStateToProps = state => {
  const { notice } = state;
  const { user } = state.auth;
  return {
    notice,
    user
  };
};

export default connect(mapStateToProps)(ProfileScreen);
