import { Subject } from "rxjs";
import { Injectable } from "@angular/core";
import { placesList } from "../models/placesList";
import { Subscription } from 'rxjs';
import { BlacklistService } from './blacklist.service';

@Injectable({
  providedIn: "root"
})
export class PlaceService {
  places;
  blacklist = [];
  blacklistSubscription: Subscription;

  constructor(
    public blacklistService: BlacklistService,
  ) {
    this.places = this.order(placesList);

    this.blacklist = this.blacklistService.get()
    this.blacklistSubscription = this.blacklistService.blacklistUpdated.subscribe(()=>{
      this.blacklist = this.blacklistService.get()
    })
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
    return this.filterBlacklist([...this.places], this.blacklist);
  }

  filterType(modality: string) {
    this.places = this.filterBlacklist(
      this.order(placesList).filter(_place => modality === '' || _place.modality === modality),
      this.blacklist
    );
    this.placesUpdated.next();
  }

  filterName(name: string) {
    this.places = this.filterBlacklist(
      this.order(placesList).filter(_place => name === '' || _place.name.includes(name)),
      this.blacklist
    );
    this.placesUpdated.next();
  }

  getBySlug(slug: string) {
    return placesList.find(_place => _place.slug === slug) || {name:'', modality:'', id:''};
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

  getModality(places) {
    return (places || [])
      .map(_place => _place.modality)
      .reduce((uniqueTypes, currentType) => {
        if (typeof(uniqueTypes) === 'string') return [uniqueTypes]
        return uniqueTypes.includes(currentType) ? uniqueTypes : [...uniqueTypes, currentType]
      })
  }

  filterBlacklist(places, blacklist) {
    return (places || [])
      .filter(_place => !(blacklist || []).includes(_place.id))
  }
}
