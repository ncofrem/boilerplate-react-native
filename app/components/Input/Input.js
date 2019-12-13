import React from 'react';
import { TextInput } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';

const Input = ({
  placeholderTextColor,
  underlineColorAndroid,
  reference,
  ...props
}) => (
  <TextInput
    ref={reference}
    placeholderTextColor={placeholderTextColor}
    underlineColorAndroid={underlineColorAndroid}
    style={styles.input}
    {...props}
  />
);

Input.propTypes = {
  reference: PropTypes.func,
  placeholderTextColor: PropTypes.string,
  underlineColorAndroid: PropTypes.string
};

Input.defaultProps = {
  placeholderTextColor: 'rgba(0,0,0,0.7)',
  underlineColorAndroid: 'rgba(0,0,0,0)',
  reference: null
};

export default Input;
