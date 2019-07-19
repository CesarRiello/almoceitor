import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { LocalStorageService } from './localstorage.service';
const key = 'almoceitorvisited';

@Injectable({
  providedIn: 'root'
})
export class VisitedService {
  visited = [];
  visitedStorage = new LocalStorageService(key);

  constructor(){
    this.visited = this.visitedStorage.getList(key)
  }

  visitedUpdated = new Subject;

  add(visited){
    this.visited.push(visited)
    this.visitedStorage.updateList(this.visited)
    this.visitedUpdated.next()
  }

  remove(visited){
    this.visited = this.visited.filter(_visited => _visited !== visited)
    this.visitedStorage.updateList(this.visited, key)
    this.visitedUpdated.next()
  }

  clean(){
    this.visited = []
    this.visitedStorage.updateList(this.visited, key)
    this.visitedUpdated.next()
  }

  get(){
    return [...this.visited]
  }

}
