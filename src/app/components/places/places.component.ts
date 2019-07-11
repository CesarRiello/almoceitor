import { Component, OnInit } from '@angular/core';
import { PlaceService } from '../../services/place.service'
import { FavoriteService } from '../../services/favorite.service'
import { Subscription } from 'rxjs';

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
  searchParam = 'ok';
  placeSubscription: Subscription;
  favoriteSubscription: Subscription;

  constructor(
    public placeService: PlaceService,
    public favoriteService: FavoriteService
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

    this.placesTypes = this.placeService.getTypes(this.places)
  }

  OnDestroy(){
    this.placeSubscription.unsubscribe()
    this.favoriteSubscription.unsubscribe()
  }

  filterByType(type:string) {
    this.placeService.filterType(type)
  }

  toogleFavorite(place){
    if (this.favorites.includes(place.id)) {
      this.favoriteService.remove(place.id)
    } else {
      this.favoriteService.add(place.id)
    }
  }

  randomPlace(){
    alert(this.places[Math.ceil(Math.random() * this.places.length)].name)
  }

  search(form){
    this.placeService.filterName(form.value.searchParam)
  }

}
