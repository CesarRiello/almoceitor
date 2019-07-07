import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { placesList } from '../models/placesList';

@Injectable({
  providedIn: 'root'
})
export class PlaceService {
  places;

  constructor(){
    this.places = placesList
  }

  placesUpdated = new Subject;

  add(place){
    this.places.push(place)
    this.placesUpdated.next()
  }
  
  remove(place){
    this.places = this.places.filter(_place => _place !== place)
    this.placesUpdated.next()
  }

  get(){
    return [...this.places]
  }

  filterType(type:string){
    this.places = this.places.filter(_place => _place.type == type)
  }

}
