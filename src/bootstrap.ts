import 'expose?Zone!zone.js';
import 'reflect-metadata';
import {BACKAND_PROVIDERS} from 'sdk/index';
import {HTTP_PROVIDERS}    from 'angular2/http';
import {App}               from './app'
import {bootstrap}         from 'angular2/platform/browser';

bootstrap(App, [BACKAND_PROVIDERS, HTTP_PROVIDERS]);


