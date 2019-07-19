import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { LocalStorageService } from './localstorage.service';
const key = 'almoceitorfavorites';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  favorite = [];
  favoriteStorage = new LocalStorageService(key);

  constructor(){
    this.favorite = this.favoriteStorage.getList(key)
  }

  favoriteUpdated = new Subject;

  add(favorite){
    this.favorite.push(favorite)
    this.favoriteStorage.updateList(this.favorite)
    this.favoriteUpdated.next()
  }

  remove(favorite){
    this.favorite = this.favorite.filter(_favorite => _favorite !== favorite)
    this.favoriteStorage.updateList(this.favorite, key)
    this.favoriteUpdated.next()
  }

  clean(){
    this.favorite = []
    this.favoriteStorage.updateList(this.favorite, key)
    this.favoriteUpdated.next()
  }

  get(){
    return [...this.favorite]
  }

}
