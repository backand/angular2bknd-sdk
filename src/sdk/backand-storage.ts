import {Injectable} from "angular2/core";

/**
 * interface for a storage that implements the
 * window local / session storage spec
 */
class BackandStorage {

  private name:string;
  private storage:any;

  constructor(name:string, storage:any) {
    this.name    = name;
    this.storage = storage;
  }

  get() {
    return JSON.parse(this.storage.getItem(this.name));
  }

  set(value) {
    this.storage.setItem(this.name, JSON.stringify(value));
  }

  clear() {
    this.storage.removeItem(this.name);
  }

}

/**
 * describe a storage that our backand storageFactory
 * can work with
 */
export interface IStorage {
  getItem(key):any;
  setItem(key:string, value:string):any
  removeItem(key:string):boolean;
}

/**
 * default implementation of a storage that
 * will be used in case of no window storage
 */
class InMemoryStorage implements IStorage {

  private storage = new Map();

  getItem(key) {
    return this.storage.get(key);
  }

  setItem(key, value) {
    this.storage.set(key, value);
  }

  removeItem(key):boolean {
    return this.storage.delete(key)
  }
}

/**
 * returns a pointer to a window storage or
 * instance of the InMemoryStorage object
 */
@Injectable()
export class BackandStorageFactory {

  private storageMap     = new Map();
  private defaultStorage = new InMemoryStorage();

  constructor() {
    console.debug('STORAGE INSTANTIATED');
    this.registerWindowStorage();

    //todo: extract to configuration
    this.registerStore('user', 'local');
    this.registerStore('token', 'local');
  }

  /**
   * return an instance of backand storage
   *
   * @param storeName
   * @param storageType
   * @returns {BackandStorage}
   */
  registerStore(storeName:string, storageType:string):void {
    this[storeName] = new BackandStorage(storeName, this.resolveStorageType(storageType))
  }

  get(key:string){
    return this.storageMap.get(key)
  }

  /**
   * init window local and session storage
   * if exist
   */
  private registerWindowStorage() {
    if (!window) {
      return;
    }

    if (window.localStorage) {
      this.storageMap.set('local', window.localStorage);
    }

    if (window.sessionStorage) {
      this.storageMap.set('local', window.sessionStorage);
    }
  }

  /**
   * locate and return the corresponding storage
   * type from the store map.
   *
   * @param storageType
   * @returns {any}
   */
  private resolveStorageType(storageType) {

    if (this.storageMap.has(storageType)) {
      return this.storageMap.get(storageType)
    }

    return this.defaultStorage;
  }

  /**
   * register a custom store to the map
   *
   * @param name
   * @param storage
   */
  registerCustomStorage(name:string, storage:IStorage) {
    this.storageMap.set(name, storage);
  }
}
