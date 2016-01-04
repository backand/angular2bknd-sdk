import {Injectable} from "angular2/core";

export interface IProvider {
  name:string;
  label:string;
  url:string;
  css: string;
  id: number;
}

@Injectable()
export class BackandSocialProviders {

  private socialProviders:Object = {};

  registerProvider(provider:IProvider){
    this.socialProviders[provider.name] = provider;
  }

  getProviders():Object{
    return this.socialProviders;
  }
}
