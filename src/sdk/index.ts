import {BackandSocialProviders} from './backand-social-providers';
import {BackandStorageFactory}  from './backand-storage';
import {BackandSocket}          from './backand-socket';
import {BackandConfig}          from './backand-config';
import {BackandAuth}            from './backand-auth.ts';
import {BackandUser}            from './backand-user';
import {BackandHttp}            from './backand-http';
import {Backand}                from './backand'

export const BACKAND_PROVIDERS:Array<any> = [
  BackandSocialProviders,
  BackandStorageFactory,
  BackandSocket,
  BackandConfig,
  BackandAuth,
  BackandUser,
  BackandHttp,
  Backand
];




