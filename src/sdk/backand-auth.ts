import {SOCIALPROVIDERS, getSocialUrl} from './backand-constants';
import {BackandStorageFactory}         from "./backand-storage";
import {BackandConfig}                 from "./backand-config";
import {BackandSocket}                 from "./backand-socket";
import {BackandHttp}                   from "./backand-http";
import {Injectable}                    from 'angular2/core';
import {Http}                          from "angular2/http";

@Injectable()
export class BackandAuth {
  private authenticating:boolean;
  private inSocialSignup:boolean;
  private isLoginInProgress:boolean;
  private socialAuthWindow:any;
  private DUMMY_RETURN_ADDRESS = 'http://www.backandaaaa.com';
  private NOT_SIGNEDIN_ERROR = 'The user is not signed up to';

  constructor(private config:BackandConfig,
              private storage:BackandStorageFactory,
              private http:BackandHttp,
              private socket:BackandSocket) {
    console.log(this);
    console.debug('AUTH INSTANTIATED..');
  }

  public signin(username:string, password:string) {
    const userData = {
      grant_type: 'password',
      username: username,
      password: password,
      appname: this.config.appname
    };

    return this.authenticate(userData)
  };

  public signout():Promise<any> {
    this.storage['token'].clear();
    this.storage['user'].clear();

    //BackandHttpBufferService.rejectAll('signed out');
    //$rootScope.$broadcast(EVENTS.SIGNOUT);
    return Promise.resolve();
  }

  public signup(firstName:string,
                lastName:string,
                email:string,
                password:string,
                confirmPassword:any,
                parameters:any):Promise<any> {

    // wrap in a promise and return it
    return new Promise((resolve, reject)=> {

      this.http.post({
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            parameters
          }, {
            'SignUpToken': this.config.signupToken
          })
          .subscribe(
              response => {
                if (this.config.runSigninAfterSignup && response.json().currentStatus === 1) {
                  this.signin(email, password);
                }
                resolve(response)
              },

              error=> reject(error)
          );
    });
  }

  private authenticate(userData) {

    if (this.authenticating) {
      return;
    }

    this.authenticating = true;
    this.storage['token'].clear();

    return new Promise((resolve, reject) => {

      this.http.post(userData, {
        'Content-Type': 'application/x-www-form-urlencoded'
      }).subscribe(
          (response) => {
            if (response.json() && response.json().access_token) {
              this.config.token = 'bearer ' + response.json().access_token;

              this.storage['token'].set(this.config.token);
              this.storage['user'].set(response.json());

              //todo: if there is another promise that didn't resolved
              if(this.isLoginInProgress) {
                resolve(this.config.token);
              }

              // $rootScope.$broadcast(EVENTS.SIGNIN);

              if (this.config.runSocket) {
                this.socket.login(this.storage['token'].get(), this.config.anonymousToken, this.config.appName, this.config.socketUrl);
              }
              //    } else if (self.loginPromise) {
              //      self.loginPromise.reject('token is undefined');
              //    }
            }

            resolve(response.json());
          },

          (error) => {
            this.authenticating = false;
            reject(error)
          }
      );
    });
  }

  public socialSignup(provider, spec?:string){
    return this.socialAuth(provider, false, spec);
  }

  private mobileSocialLoginInner(ref, isSignUp, provider, spec) {
    ref.addEventListener('loadstart', (e:any) => {
      if (e.url.indexOf(this.DUMMY_RETURN_ADDRESS) == 0) {
        ref.close();

        // error return from server
        if (e.url.indexOf('error=') > -1) {
          var dataStr = decodeURI(e.url).split('error=')[1];
          var userData = JSON.parse(dataStr);
          if (!isSignUp && this.config.callSignupOnSingInSocialError && userData.message.indexOf(this.NOT_SIGNEDIN_ERROR) > -1) {  // check is right error
            this.socialAuth(provider, true, spec);
            return;
          }

          let rejection = {
            data: userData.message + ' (signing in with ' + userData.provider + ')'
          };

          rejection['error_description'] = rejection.data;
          //this.loginPromise.reject(rejection);
          return;
        }

        // login is OK
        var dataStr = decodeURI(e.url).split('/#/?data=')[1];
        var userData = JSON.parse(dataStr);
        if (this.inSocialSignup) {
          this.inSocialSignup = false;
          //$rootScope.$broadcast(EVENTS.SIGNUP);
        }
        this.signinWithToken(userData);
      }
    });
  }



  private socialAuth(provider, isSignUp:boolean, spec?:string){
    if (!SOCIALPROVIDERS[provider]) {
      throw Error('Unknown Social Provider');
    }

    this.isLoginInProgress = true;

    if(this.config.isMobile){
      var ref = window.open(
          this.config.apiUrl + '/1/'
          + getSocialUrl(provider, isSignUp)
          + '&appname=' + this.config.appName
          + '&returnAddress='+ this.DUMMY_RETURN_ADDRESS,
          'id1',
          spec || 'left=1, top=1, width=600, height=600');

     this.mobileSocialLoginInner(ref, isSignUp, provider, spec);
    }
    else {
      this.socialAuthWindow = window.open(
          this.config.apiUrl + '/1/'
          + getSocialUrl(provider, isSignUp)
          + '&appname=' + this.config.appName
          + '&returnAddress=',
          'id1',
          spec || 'left=1, top=1, width=600, height=600');

      window.addEventListener('message', (function(provider, spec){ return function(e) { this.setUserDataFromToken(e, provider, spec)}})(provider,spec), false);
    }

  }

  private setUserDataFromToken(event, provider, spec) {

    this.socialAuthWindow.close();
    this.socialAuthWindow = null;

    if (event.origin !== location.origin) {
      return;
    }

    var userData = JSON.parse(event.data);
    if (userData.error) {

      if (this.config.callSignupOnSingInSocialError && userData.error.message.indexOf(this.NOT_SIGNEDIN_ERROR) > -1) {  // check is right error
        this.socialAuth(provider, true, spec);
        return;
      }

      var rejection = {
        data: userData.error.message + ' (signing in with ' + userData.error.provider + ')'
      };
      rejection['error_description'] = rejection.data;
      this.isLoginInProgress = false;

    }
    else if (userData.data) {
      //if (self.inSocialSignup) {
      //  self.inSocialSignup = false;
      //  $rootScope.$broadcast(EVENTS.SIGNUP);
      //}
      return this.signinWithToken(userData.data);
    }
    else {
      this.isLoginInProgress = false;
    }
  }

  private signinWithToken(userData) {
    const tokenData = {
      grant_type: 'password',
      accessToken: userData.access_token,
      appName: this.config.appName
    };

    //if (self.signupParameters) {
      //tokenData.parameters = self.signupParameters;
      //self.signupParameters = null;
    //}

    return this.authenticate(tokenData);
  }
}
