import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PlaceService } from '../../services/place.service'
import { FavoriteService } from '../../services/favorite.service'
import { BlacklistService } from '../../services/blacklist.service'
import { VisitedService } from 'src/app/services/visited.service';

@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.styl']
})
export class PlacesComponent implements OnInit {
  places = [];
  placesTypes = [];
  blacklist = [];
  favorites = [];
  visited = [];

  searchParam = 'ok';
  placeSubscription: Subscription;
  favoriteSubscription: Subscription;
  blacklistSubscription: Subscription;
  visitedSubscription: Subscription;

  constructor(
    public placeService: PlaceService,
    public favoriteService: FavoriteService,
    public blacklistService: BlacklistService,
    public visitedService: VisitedService,
    ) { }

  ngOnInit() {
    this.places = this.placeService.get()
    this.placeSubscription = this.placeService.placesUpdated.subscribe(()=>{
      this.places = this.placeService.get()
    })

    this.favorites = this.favoriteService.get()
    this.favoriteSubscription = this.favoriteService.favoriteUpdated.subscribe(()=>{
      this.favorites = this.favoriteService.get()
    })

    this.blacklist = this.blacklistService.get()
    this.blacklistSubscription = this.blacklistService.blacklistUpdated.subscribe(()=>{
      this.blacklist = this.blacklistService.get()
    })

    this.visited = this.visitedService.get()
    this.visitedSubscription = this.visitedService.visitedUpdated.subscribe(()=>{
      this.visited = this.visitedService.get()
    })

    this.placesTypes = this.placeService.getModality(this.places)
  }

  filterByType(type:string) {
    this.placeService.filterType(type)
  }

  randomPlace(){
    const randomPlace = this.places[Math.floor(Math.random() * this.places.length)]
    alert(`${randomPlace.name} (${randomPlace.modality})`)
  }

  search(form){
    this.placeService.filterName(form.value.searchParam)
  }

  OnDestroy(){
    this.favoriteSubscription.unsubscribe()
    this.blacklistSubscription.unsubscribe()
    this.visitedSubscription.unsubscribe()
  }

  toogleFavorite(place){
    if (this.favorites.includes(place.id)) {
      this.favoriteService.remove(place.id)
    } else {
      this.favoriteService.add(place.id)
    }
  }

  toogleBlacklist(place){
    if (this.blacklist.includes(place.id)) {
      this.blacklistService.remove(place.id)
    } else {
      this.blacklistService.add(place.id)
    }
  }

  toogleVisited(place){
    if (this.blacklist.includes(place.id)) {
      this.visitedService.remove(place.id)
    } else {
      this.visitedService.add(place.id)
    }
  }

}
