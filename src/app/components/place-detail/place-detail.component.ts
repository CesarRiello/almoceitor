import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { PlaceService } from '../../services/place.service'
import { FavoriteService } from '../../services/favorite.service'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.component.html',
  styleUrls: ['./place-detail.component.styl']
})
export class PlaceDetailComponent implements OnInit {
  slug = '';
  place = {name:'', type:'', id:''};
  favorites = [];
  placeSubscription: Subscription;
  favoriteSubscription: Subscription;


  constructor(
    public placeService: PlaceService,
    public favoriteService: FavoriteService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.slug = this.route.snapshot.paramMap.get("slug")
    this.place = this.placeService.getBySlug(this.slug)
    console.log('www', this.slug, this.place);    
    
    this.favorites = this.favoriteService.get()
    this.favoriteSubscription = this.favoriteService.favoriteUpdated.subscribe(()=>{
      this.favorites = this.favoriteService.get()
    })

  }

  OnDestroy(){
    this.favoriteSubscription.unsubscribe()
  }

  toogleFavorite(place){
    if (this.favorites.includes(place.id)) {
      this.favoriteService.remove(place.id)
    } else {
      this.favoriteService.add(place.id)
    }
  }

}
