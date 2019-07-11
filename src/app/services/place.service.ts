import { Subject } from "rxjs";
import { Injectable } from "@angular/core";
import { placesList } from "../models/placesList";

@Injectable({
  providedIn: "root"
})
export class PlaceService {
  places;

  constructor() {
    this.places = this.order(placesList);
  }

  placesUpdated = new Subject();

  add(place) {
    this.places.push(place);
    this.placesUpdated.next();
  }

  remove(place) {
    this.places = this.places.filter(_place => _place !== place);
    this.placesUpdated.next();
  }

  get() {
    return [...this.places];
  }

  filterType(type: string) {
    this.places = this.order(placesList).filter(_place => type === '' || _place.type === type);
    this.placesUpdated.next();
  }

  filterName(name: string) {
    this.places = this.order(placesList).filter(_place => name === '' || _place.name.includes(name));
    this.placesUpdated.next();
  }

  getBySlug(slug: string) {
    return placesList.find(_place => _place.slug === slug) || {name:'', type:'', id:''};
  }

  order(places) {
    return places.sort((a, b) => {
      if (a.name > b.name) {
        return 1;
      }
      if (a.name < b.name) {
        return -1;
      }
      return 0;
    });
  }

  getTypes(places) {
    return (places || [])
      .map(_place => _place.type)
      .reduce((uniqueTypes, currentType) => {
        if (typeof(uniqueTypes) === 'string') return [uniqueTypes]
        return uniqueTypes.includes(currentType) ? uniqueTypes : [...uniqueTypes, currentType]
      })
  }
}
