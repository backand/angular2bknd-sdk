export const CONFIG = {
  API_URL: 'https://api.backand.com',
  SOCKET_URL: 'https://api.backand.com:4000',
  ANONYMOUS_TOKEN: null,
  SIGNUP_TOKEN: null,
  IS_MANAGING_HTTP_INTERCEPTOR: true,
  IS_MANAGING_REFRESH_TOKEN: true,
  RUN_SIGNIN_AFTER_SIGNUP: true,
  CALL_SIGNUP_ON_SINGIN_SOCIAL_ERROR : true, // tell code to run signup after signIn error because user is not registered to application
  APP_NAME: null,
  USER_PROFILE_NAME: 'backand_user',
  IS_MOBILE: false,
  RUN_SOCKET: false
};

export const EVENTS = {
  SIGNIN: 'BackandSignIn',
  SIGNOUT: 'BackandSignOut',
  SIGNUP: 'BackandSignUp'
};

export const SOCIALPROVIDERS = {
  GITHUB: {name: 'github', label: 'Github', url: 'www.github.com', css: 'github', id: 1},
  GOOGLE: {name: 'google', label: 'Google', url: 'www.google.com', css: 'google-plus', id: 2},
  FACEBOOK: {name: 'facebook', label: 'Facebook', url: 'www.facebook.com', css: 'facebook', id: 3}
};
