import {URLS}          from './backand-constants';
import {BackandConfig} from "./backand-config";
import {Injectable}    from 'angular2/core';
import {Http, Headers} from "angular2/http";

@Injectable()
export class BackandHttp {

  private headers:Headers;

  constructor(private http:Http, private config:BackandConfig) {

  }

  post(data, headers={}) {
    return this.http.post(this.config.apiUrl + URLS.SIGN_UP,
        JSON.stringify(data), new Headers(headers));
  }

}
