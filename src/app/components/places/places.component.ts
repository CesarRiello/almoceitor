import { Component, OnInit } from '@angular/core';
import { PlaceService } from '../../services/place.service'
import { BlacklistService } from '../../services/blacklist.service'
import { FavoriteService } from '../../services/favorite.service'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.styl']
})
export class PlacesComponent implements OnInit {
  places = [];
  blacklist = [];
  favorites = [];
  placeSubscription: Subscription;
  blacklistSubscription: Subscription;
  favoriteSubscription: Subscription;

  constructor(
    public placeService: PlaceService,
    public blacklistService: BlacklistService,
    public favoriteService: FavoriteService
    ) { }

  ngOnInit() {
    this.places = this.placeService.get()
    this.blacklist = this.blacklistService.get()
    this.favorites = this.favoriteService.get()

    this.placeSubscription = this.placeService.placesUpdated.subscribe(()=>{
      this.places = this.placeService.get()
    })
    this.blacklistSubscription = this.blacklistService.blacklistUpdated.subscribe(()=>{
      this.blacklist = this.blacklistService.get()
    })
    this.favoriteSubscription = this.favoriteService.favoriteUpdated.subscribe(()=>{
      this.favorites = this.favoriteService.get()
    })
  }

  OnDestroy(){
    this.placeSubscription.unsubscribe()
  }

  filterByType(type:string){
    this.placeService.filterType(type)
  }

  toogleFavorite(place){
    if (this.favorites.includes(place.id)) {
      console.log('remove', place);
      this.favoriteService.remove(place.id)
    } else {
      console.log('add', place);
      this.favoriteService.add(place.id)
    }
  }

  toogleDisable(place){
    if (this.blacklist.includes(place.id)) {
      console.log('remove', place);
      this.blacklistService.remove(place.id)
    } else {
      console.log('add', place);
      this.blacklistService.add(place.id)
    }
  }  

}
