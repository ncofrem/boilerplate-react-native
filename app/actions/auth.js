export const authTypes = {
  SIGN_IN_REQUEST: 'SIGN_IN_REQUEST',
  SIGN_IN_SUCCESS: 'SIGN_IN_SUCCESS',
  SIGN_IN_FAILURE: 'SIGN_IN_FAILURE',
  SIGN_OUT_REQUEST: 'SIGN_OUT_REQUEST',
  SIGN_OUT_SUCCESS: 'SIGN_OUT_SUCCESS',
  SIGN_OUT_FAILURE: 'SIGN_OUT_FAILURE',
  SIGN_UP_REQUEST: 'SIGN_UP_REQUEST',
  SIGN_UP_SUCCESS: 'SIGN_UP_SUCCESS',
  SIGN_UP_FAILURE: 'SIGN_UP_FAILURE',
  PASSWORD_RECOVERY_REQUEST: 'PASSWORD_RECOVERY_REQUEST',
  PASSWORD_RECOVERY_SUCCESS: 'PASSWORD_RECOVERY_SUCCESS',
  PASSWORD_RECOVERY_FAILURE: 'PASSWORD_RECOVERY_FAILURE',
  SET_INFO_USER: 'SET_INFO_USER'
};

export const signIn = params => ({
  type: authTypes.SIGN_IN_REQUEST,
  params
});

export const signOut = () => ({ type: authTypes.SIGN_OUT_REQUEST });

export const passwordRecovery = params => ({
  type: authTypes.PASSWORD_RECOVERY_REQUEST,
  params
});

export const signUp = params => ({
  type: authTypes.SIGN_UP_REQUEST,
  params
});

export const setInfoUser = result => ({
  type: authTypes.SET_INFO_USER,
  result
});
