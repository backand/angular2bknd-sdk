import {Injectable} from 'angular2/core';

@Injectable()
export class BackandSocket {

  private socket:any;
  private io:any;

  login(token, anonymousToken, appName, url) {

    this.socket = this.io.connect(url, {'forceNew': true});

    this.socket.on('connect', function () {
      console.log('socket connected');
      this.socket.emit("login", token, anonymousToken, appName);
    });

    this.socket.on('disconnect', () => console.log('socket disconnect'));
    this.socket.on('reconnecting', () => console.log('socket reconnecting'));

  };
}
