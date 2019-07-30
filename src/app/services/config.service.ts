import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { LocalStorageService } from './localstorage.service';
const key = 'almoceitorconfig';
const configNames = ['favorites', 'blacklist', 'visited'];

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  config = {
    favorites: [],
    blacklist: [],
    visited: []
  };
  configStorage = new LocalStorageService(key);

  constructor(){
    this.config = {...this.config, ...this.configStorage.get(key)}
  }

  configUpdated = new Subject;

  add(name, item){
    const _list = {}
    _list[name] = this.config[name] || []
    _list[name].push(item)

    this.update(_list)
  }

  update(config){
    this.config = {...this.config, ...config}
    this.configStorage.update(this.config)
    this.configUpdated.next()
  }

  remove(name, item){
    if (!this.config.hasOwnProperty(name))
    return

    const _list = {}
    _list[name] = this.config[name].filter(_listItem => _listItem !== item)
    this.update(_list)
  }

  clean(name){
    if (!this.config.hasOwnProperty(name))
    return

    const _list = {}
    _list[name] = []
    this.update(_list)
  }

  get(){
    return this.configStorage.get(key)
  }

}
