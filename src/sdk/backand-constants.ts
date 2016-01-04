export const URLS = {
  SIGN_UP: '/1/user/signup',
  TOKEN: '/token',
  REQUEST_RESET_PASSWORD: '/1/user/requestResetPassword',
  RESET_PASSWORD: '/1/user/resetPassword',
  CHANGE_PASSWORD: '/1/user/changePassword'
};

export const SOCIALPROVIDERS = {
  GITHUB: {name: 'github', label: 'Github', url: 'www.github.com', css: 'github', id: 1},
  GOOGLE: {name: 'google', label: 'Google', url: 'www.google.com', css: 'google-plus', id: 2},
  FACEBOOK: {name: 'facebook', label: 'Facebook', url: 'www.facebook.com', css: 'facebook', id: 3}
};

export function getSocialUrl(providerName, isSignup) {
  const provider = SOCIALPROVIDERS[providerName];
  const action = isSignup ? 'up' : 'in';
  return 'user/socialSign' + action +
      '?provider=' + provider.label +
      '&response_type=token&client_id=self&redirect_uri=' + provider.url +
      '&state=';
}

