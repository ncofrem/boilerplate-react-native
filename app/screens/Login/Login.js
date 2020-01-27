import React from 'react';
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  View,
  Keyboard,
  Modal,
  Text,
  TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import { MainLogo, DefaultButton, Input } from '../../components';
import { signIn, passwordRecovery } from '../../actions/auth';
import styles from './styles';
import AlertHelper from '../../services/AlertHelper';

class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      modalVisible: false
    };
  }

  componentDidUpdate(prevProps) {
    const { signedIn, navigation, notice } = this.props;
    if (notice.message !== '') {
      AlertHelper.show(notice.kind, notice.title, notice.message);
    }
    if (prevProps.signedIn !== signedIn && signedIn) {
      navigation.navigate('App');
    }
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  signInAsync = async (email, password) => {
    const { dispatch } = this.props;
    dispatch(signIn({ email, password }));
  };

  static navigationOptions = {
    headerShown: false
  };

  handlePasswordRecovery(email) {
    const { dispatch } = this.props;
    dispatch(passwordRecovery({ email }));
    this.setModalVisible(false);
  }

  render() {
    const { email, password, modalVisible } = this.state;
    const { ongoingRequest } = this.props;
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.mainContainer}>
        <TouchableWithoutFeedback accessible={false} onPress={Keyboard.dismiss}>
          <View style={styles.loginContainer}>
            <View style={styles.imageContainer}>
              <MainLogo />
            </View>
            <View style={styles.container}>
              <Input
                value={email}
                onChangeText={_email => this.setState({ email: _email })}
                autoCapitalize="none"
                onSubmitEditing={() => this.passwordInput.focus()}
                autoCorrect={false}
                blurOnSubmit={false}
                keyboardType="email-address"
                returnKeyType="next"
                placeholder="Email"
              />

              <Input
                value={password}
                reference={component => {
                  this.passwordInput = component;
                }}
                onSubmitEditing={() => this.signInAsync(email, password)}
                onChangeText={_password =>
                  this.setState({ password: _password })
                }
                returnKeyType="go"
                placeholder="Password"
                secureTextEntry
              />
              <DefaultButton
                title="¿Olvidaste tu contraseña?"
                containerStyles={{
                  backgroundColor: 'transparent'
                }}
                textStyles={{
                  textAlign: 'right',
                  color: 'black'
                }}
                onPress={() => this.setModalVisible(true)}
              />
              <Modal
                animationType="slide"
                transparent={false}
                visible={modalVisible}
                onRequestClose={() => this.setModalVisible(false)}
              >
                <KeyboardAvoidingView
                  behavior="padding"
                  style={styles.modalContainer}
                >
                  <TouchableWithoutFeedback
                    accessible={false}
                    onPress={Keyboard.dismiss}
                  >
                    <View>
                      <TouchableOpacity
                        style={styles.icon}
                        onPress={() => this.setModalVisible(false)}
                      >
                        <Icon
                          name={styles.iconName}
                          size={styles.iconSize}
                          color={styles.iconColor}
                        />
                      </TouchableOpacity>
                      <Text style={styles.modalTitle}>
                        Recuperar contraseña
                      </Text>
                      <Text style={styles.modalText}>
                        Ingresa tu correo electrónico para que te enviemos las
                        instrucciones para recuperar tu contraseña
                      </Text>
                      <Input
                        value={email}
                        onChangeText={_email =>
                          this.setState({ email: _email })
                        }
                        onSubmitEditing={() =>
                          this.handlePasswordRecovery(email)
                        }
                        returnKeyType="go"
                        keyboardType="email-address"
                        placeholder="Correo electrónico"
                      />
                      <DefaultButton
                        title="ENVIAR"
                        onPress={() => this.handlePasswordRecovery(email)}
                      />
                    </View>
                  </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
              </Modal>
              <DefaultButton
                title={ongoingRequest.signIn ? 'CARGANDO...' : 'ENTRAR'}
                onPress={() => this.signInAsync(email, password)}
                disabled={ongoingRequest.signIn}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }
}

const propTypes = {
  ongoingRequest: PropTypes.shape({
    signIn: PropTypes.bool,
    signOut: PropTypes.bool
  }),
  notice: PropTypes.shape({
    kind: PropTypes.string,
    title: PropTypes.string,
    message: PropTypes.string
  }),
  signedIn: PropTypes.bool,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }).isRequired,
  dispatch: PropTypes.func.isRequired
};

const defaultProps = {
  ongoingRequest: { signIn: false, signOut: false },
  notice: {
    kind: '',
    title: '',
    message: ''
  },
  signedIn: false
};

LoginScreen.propTypes = propTypes;
LoginScreen.defaultProps = defaultProps;

const mapStateToProps = state => {
  const { notice } = state;
  const { ongoingRequest, signedIn } = state.auth;
  return {
    notice,
    ongoingRequest,
    signedIn
  };
};

export default connect(mapStateToProps)(LoginScreen);
