import { Component, OnInit } from '@angular/core';

import { FavoriteService } from '../../services/favorite.service'
import { BlacklistService } from '../../services/blacklist.service'
import { VisitedService } from 'src/app/services/visited.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.styl']
})
export class ConfigComponent implements OnInit {
  blacklist = [];
  favorites = [];
  visited = [];

  favoriteSubscription: Subscription;
  blacklistSubscription: Subscription;
  visitedSubscription: Subscription;

  constructor(
    public favoriteService: FavoriteService,
    public blacklistService: BlacklistService,
    public visitedService: VisitedService,
    ) { }

  ngOnInit() {

    this.favorites = this.favoriteService.get()
    this.favoriteSubscription = this.favoriteService.favoriteUpdated.subscribe(()=>{
      this.favorites = this.favoriteService.get()
      console.log('this.favorites', this.favorites);

    })

    this.blacklist = this.blacklistService.get()
    this.blacklistSubscription = this.blacklistService.blacklistUpdated.subscribe(()=>{
      this.blacklist = this.blacklistService.get()
      console.log('this.blacklist', this.blacklist);

    })

    this.visited = this.visitedService.get()
    this.visitedSubscription = this.visitedService.visitedUpdated.subscribe(()=>{
      this.visited = this.visitedService.get()
      console.log('this.visited', this.visited);

    })

  }

  OnDestroy(){
    this.favoriteSubscription.unsubscribe()
    this.blacklistSubscription.unsubscribe()
    this.visitedSubscription.unsubscribe()
  }

  cleanVisited(){
    this.visitedService.clean()
  }

  cleanFavorites(){
    this.favoriteService.clean()
  }

  cleanBlacklist(){
    this.blacklistService.clean()
  }

}
