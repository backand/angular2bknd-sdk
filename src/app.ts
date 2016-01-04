import {Component, Inject}  from 'angular2/core';
import {BACKAND_PROVIDERS} from './sdk/index';
import {BackandConfig} from "./sdk/backand-config";
import {Backand} from "./sdk/backand";

@Component({
  selector: 'App',
  providers:[BACKAND_PROVIDERS],
  template: '<h1>BackandSDK Test App</h1>'
})

export class App {

  constructor(config:BackandConfig, backand:Backand) {
    console.debug('APP COMPONENT INSTANTIATED');


    // SIGN UP EXAMPLE
    //backand.signup('1', '2', '5@gmail.com','123456','123456')
    //    .then( result => console.log('results from promise', result) )
  }
}


