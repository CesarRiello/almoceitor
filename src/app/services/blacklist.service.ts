import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { LocalStorageService } from './localstorage.service';
const key = 'almoceitorblacklist';

@Injectable({
  providedIn: 'root'
})
export class BlacklistService {
  blacklist = [];
  blacklistStorage = new LocalStorageService(key);

  constructor(){
    this.blacklist = this.blacklistStorage.getList(key)
  }

  blacklistUpdated = new Subject;

  add(blacklist){
    this.blacklist.push(blacklist)
    this.blacklistStorage.updateList(this.blacklist)
    this.blacklistUpdated.next()
  }

  remove(blacklist){
    this.blacklist = this.blacklist.filter(_blacklist => _blacklist !== blacklist)
    this.blacklistStorage.updateList(this.blacklist, key)
    this.blacklistUpdated.next()
  }

  get(){
    return [...this.blacklist]
  }


}
