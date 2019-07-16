import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { PlaceService } from '../../services/place.service'
import { FavoriteService } from '../../services/favorite.service'
import { BlacklistService } from '../../services/blacklist.service'
import { VisitedService } from '../../services/visited.service'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.component.html',
  styleUrls: ['./place-detail.component.styl']
})
export class PlaceDetailComponent implements OnInit {
  slug = '';
  place = {name:'', modality:'', id:'', slug:''};
  favorites = [];
  blacklist = [];
  visited = [];
  placeSubscription: Subscription;
  favoriteSubscription: Subscription;
  visitedSubscription: Subscription;
  blacklistSubscription: Subscription;

  constructor(
    public placeService: PlaceService,
    public favoriteService: FavoriteService,
    public blacklistService: BlacklistService,
    public visitedService: VisitedService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.slug = this.route.snapshot.paramMap.get("slug");
    this.place = this.placeService.getBySlug(this.slug);

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
    if (this.visited.includes(place.id)) {
      this.visitedService.remove(place.id)
    } else {
      this.visitedService.add(place.id)
    }
  }

}
