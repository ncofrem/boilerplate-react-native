import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import DropdownAlert from 'react-native-dropdownalert';
import { clearNotice } from '../../actions/notice';
import AlertHelper from '../../services/AlertHelper';

class Alert extends Component {
  closeCallback = () => {
    const { dispatch } = this.props;
    dispatch(clearNotice());
  };

  render() {
    return (
      <DropdownAlert
        defaultContainer={{
          padding: 8,
          flexDirection: 'row'
        }}
        ref={ref => AlertHelper.setDropDown(ref)}
        onClose={() => AlertHelper.invokeOnClose(this.closeCallback)}
      />
    );
  }
}

const propTypes = {
  dispatch: PropTypes.func.isRequired
};

Alert.propTypes = propTypes;

export default connect()(Alert);
