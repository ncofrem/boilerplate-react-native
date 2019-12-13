import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import styles from './styles';
import AlertHelper from '../../services/AlertHelper';

class HomeScreen extends React.Component {
  componentDidUpdate() {
    const { notice } = this.props;
    if (notice.message !== '') {
      AlertHelper.show(notice.kind, notice.title, notice.message);
    }
  }

  render() {
    return (
      <View style={styles.formContainer}>
        <Text>Home</Text>
      </View>
    );
  }
}

const mapStateToProps = state => {
  const { notice } = state;
  const { signedIn, headers } = state.auth;
  return {
    notice,
    signedIn,
    headers
  };
};

const propTypes = {
  notice: PropTypes.shape({
    kind: PropTypes.string,
    title: PropTypes.string,
    message: PropTypes.string
  })
};

const defaultProps = {
  notice: {
    kind: '',
    title: '',
    message: ''
  }
};

HomeScreen.propTypes = propTypes;
HomeScreen.defaultProps = defaultProps;

export default connect(mapStateToProps)(HomeScreen);
