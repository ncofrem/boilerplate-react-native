import { authTypes } from '../actions/auth';

const initialState = {
  user: {
    id: 0,
    email: ''
  },
  signedIn: false,
  ongoingRequest: {
    signIn: false,
    signOut: false,
    passwordRecovery: false
  },
  navigateTo: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case authTypes.SIGN_IN_REQUEST:
      return {
        ...state,
        ongoingRequest: { ...state.ongoingRequest, signIn: true }
      };
    case authTypes.SIGN_IN_SUCCESS:
      return {
        ...state,
        ongoingRequest: { ...state.ongoingRequest, signIn: false },
        signedIn: true
      };
    case authTypes.SIGN_IN_FAILURE:
      return {
        ...state,
        ongoingRequest: { ...state.ongoingRequest, signIn: false }
      };
    case authTypes.SIGN_OUT_REQUEST:
      return {
        ...state,
        ongoingRequest: { ...state.ongoingRequest, signOut: true }
      };
    case authTypes.SIGN_OUT_SUCCESS:
      return {
        ...initialState,
        ongoingRequest: { ...state.ongoingRequest, signOut: false }
      };
    case authTypes.SIGN_OUT_FAILURE:
      return {
        ...state,
        ongoingRequest: { ...state.ongoingRequest, signOut: false }
      };
    case authTypes.PASSWORD_RECOVERY_REQUEST:
      return {
        ...state,
        ongoingRequest: { ...state.ongoingRequest, passwordRecovery: true }
      };
    case authTypes.PASSWORD_RECOVERY_SUCCESS:
      return {
        ...state,
        ongoingRequest: { ...state.ongoingRequest, passwordRecovery: false }
      };
    case authTypes.PASSWORD_RECOVERY_FAILURE:
      return {
        ...state,
        ongoingRequest: { ...state.ongoingRequest, passwordRecovery: false }
      };
    case authTypes.SET_INFO_USER:
      return {
        ...state,
        user: action.result
      };
    default:
      return state;
  }
};

export default reducer;
