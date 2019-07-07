import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BlacklistService {
  blacklist = [];

  constructor(){
  }

  blacklistUpdated = new Subject;

  add(blacklist){
    this.blacklist.push(blacklist)
    this.blacklistUpdated.next()
  }
  
  remove(blacklist){
    this.blacklist = this.blacklist.filter(_blacklist => _blacklist !== blacklist)
    this.blacklistUpdated.next()
  }

  get(){
    return [...this.blacklist]
  }


}
