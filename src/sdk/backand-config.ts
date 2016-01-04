import {Injectable} from 'angular2/core';

@Injectable()
export class BackandConfig {

  public apiUrl:string                         = 'https://api.backand.com';
  public socketUrl:string                      = 'https://api.backand.com:4000';
  public userProfileName:string                = 'backand_user';
  public anonymousToken:string                 = 'ad92523d-e1df-4f37-812e-25a8730f7665';
  public signupToken:string                    = '7e73d1d9-5979-45c5-91db-f2693fc9551d';
  public appName:string                       = 'testsdk';
  public isManagingHttpInterceptor:boolean     = true;
  public isManagingRefreshToken:boolean        = true;
  public runSigninAfterSignup:boolean          = true;
  public callSignupOnSingInSocialError:boolean = true;
  public mobile:boolean                        = false;
  public runSocket:boolean                     = false;
  public token:string;

  constructor() {
    console.debug('CONFIG INSTANTIATED.');
  }

  setApiUrl(newApiUrl:string):BackandConfig {
    this.apiUrl = newApiUrl;
    return this;
  };

  getApiUrl():string {
    return this.apiUrl;
  };

  setSocketUrl(newSocketUrl:string):BackandConfig {
    this.socketUrl = newSocketUrl;
    return this;
  };

  setAnonymousToken(anonymousToken:string):BackandConfig {
    this.anonymousToken = anonymousToken;
    return this;
  };

  setSignupToken(signUpToken:string):BackandConfig {
    this.signupToken = signUpToken;
    return this;
  };

  setAppName(appName:string):BackandConfig {
    this.appName = appName;
    return this;
  };

  get appname(){
    return this.appName;
  }

  manageHttpInterceptor(isManagingHttpInterceptor:boolean):BackandConfig {
    this.isManagingHttpInterceptor = isManagingHttpInterceptor == undefined ? true : isManagingHttpInterceptor;
    return this;
  };

  manageRefreshToken(isManagingRefreshToken:boolean):BackandConfig {
    this.isManagingRefreshToken = isManagingRefreshToken == undefined ? true : isManagingRefreshToken;
    return this;
  };

  isRunSigninAfterSignup(isRunSigninAfterSignup:boolean):BackandConfig {
    this.runSigninAfterSignup = (isRunSigninAfterSignup == undefined) ? true : isRunSigninAfterSignup;
    return this;
  };

  isMobile():boolean {
    return this.mobile;
  }

  setIsMobile(flag:boolean):void {
    this.mobile = flag;
  }

  setCallSignupOnSingInSocialError(flag:boolean):void {
    this.callSignupOnSingInSocialError = flag
  }

  isRunSocket(runSocket:boolean):BackandConfig {
    this.runSocket = runSocket == undefined ? false : runSocket;
    return this;
  };
}
