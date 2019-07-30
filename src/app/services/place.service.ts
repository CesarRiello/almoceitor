import { Subject } from "rxjs";
import { Injectable } from "@angular/core";
import { placesList } from "../models/placesList";
import { Subscription } from 'rxjs';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: "root"
})
export class PlaceService {
  places;
  config = {};
  configSubscription: Subscription;

  constructor(
    public configService: ConfigService,
  ) {
    this.places = this.order(placesList);

    this.config = this.configService.get()
    this.configSubscription = this.configService.configUpdated.subscribe(()=>{
      this.config = this.configService.get()
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
    return this.filterBlacklist([...this.places], this.config['blacklist'] || []);
  }

  filterType(modality: string) {
    this.places = this.filterBlacklist(
      this.order(placesList).filter(_place => modality === '' || _place.modality === modality),
      this.config['blacklist'] || []
    );
    this.placesUpdated.next();
  }

  filterFavorites(hasfilter) {
    this.places = hasfilter ? this._filterFavorites(
      this.order(placesList),
      this.config['favorites'] || []
    ) : this.order(placesList);
    this.placesUpdated.next();
  }

  filterVisited(hasfilter) {
    this.places = hasfilter ? this._filterVisited(
      this.order(placesList),
      this.config['visited'] || []
    ) : this.order(placesList);
    this.placesUpdated.next();
  }

  filterName(name: string) {
    this.places = this.filterBlacklist(
      this.order(placesList).filter(_place => name === '' || _place.name.includes(name)),
      this.config['blacklist'] || []
    );
    this.placesUpdated.next();
  }

  getBySlug(slug: string) {
    return placesList.find(_place => _place.slug === slug) || {name:'', modality:'', id:'', slug:''};
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

  _filterFavorites(places, favorites) {
    return (places || [])
      .filter(_place => (favorites || []).includes(_place.id))
  }

  _filterVisited(places, visited) {
    return (places || [])
      .filter(_place => !(visited || []).includes(_place.id))
  }
}
