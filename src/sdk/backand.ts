import {Injectable} from 'angular2/core';
import {BackandAuth} from "./backand-auth";
import {BackandUser} from "./backand-user";
import {BackandSocket} from "./backand-socket";
import {BackandConfig} from "./backand-config";
import {BackandSocialProviders} from "./backand-social-providers";

@Injectable()
export class Backand {

  constructor(private backandAuth:BackandAuth,
              private backandUser:BackandUser,
              private backandSocket:BackandSocket,
              private backandConfig:BackandConfig,
              private backandSocialProviders:BackandSocialProviders) {
    console.debug('BACKAND INSTANTIATED..');
  }

  setAppName(appName:string):void {
    this.backandConfig.setAppName(appName);
  };

  //signin(username:string, password:string):any {
  //  return this.backandAuth.signin(username, password)
  //};
  //
  //signout():any {
  //  return this.backandAuth.signout();
  //};
  //
  signup(firstName:string,
         lastName:string,
         email:string,
         password:string,
         confirmPassword:string,
         parameters?:string) {
    return this.backandAuth.signup(
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        parameters);
  };

  //getSocialProviders():Object {
  //  return this.backandSocialProviders.getSocialProviders();
  //};

  //socialSignin(provider:IProvider, spec:string) {
  //  return this.backandAuth.socialSignin(provider, spec)
  //};
  //
  //socialSignup(provider, parameters, spec) {
  //  return this.backandAuth.socialSignup(provider, parameters, spec)
  //};
  //
  //requestResetPassword(email:string) {
  //  return this.backandAuth.requestResetPassword(email);
  //};
  //
  //resetPassword(newPassword:string, resetToken:string) {
  //  return this.backandAuth.resetPassword(newPassword, resetToken);
  //};
  //
  //changePassword(oldPassword:string, newPassword:string) {
  //  return this.backandAuth.changePassword(oldPassword, newPassword)
  //};
  //
  //setIsMobile(flag:boolean):void {
  //  this.backandConfig.setIsMobile(flag);
  //};
  //
  //setRunSignupAfterErrorInSigninSocial(flag:boolean):void {
  //  this.backandConfig.setCallSignupOnSingInSocialError(flag);
  //};
  //
  ////todo: implement
  //getUserDetails(force:boolean) {
  //  return this.backandUser.getUserDetails(force);
  //};
  //
  //getUsername():string {
  //  return this.backandUser.getUsername();
  //};
  //
  //getUserRole():string {
  //  return this.backandUser.getUserRole();
  //};
  //
  //getToken():string {
  //  return BKStorage.token.get();
  //};
  //
  //getApiUrl():string {
  //  return this.backandConfig.apiUrl;
  //};
  //
  //isManagingHttpInterceptor():boolean {
  //  return this.backandConfig.isManagingHttpInterceptor;
  //};
  //
  //isManagingRefreshToken():boolean {
  //  return this.backandConfig.isManagingRefreshToken && BKStorage.user.get() && BKStorage.user.get().refresh_token;
  //};
  //
  ////Socket.io service
  //isRunScoket():boolean {
  //  return this.backandConfig.runScoket;
  //};
  //
  //socketLogin():void {
  //  if (this.backandConfig.runSocket)
  //    this.backandSocket.login(BKStorage.token.get(), this.backandConfig.anonymousToken, this.backandConfig.appName, config.socketUrl);
  //};
  //
  //on(eventName, callback) {
  //  this.backandSocket.on(eventName, callback);
  //};

}


