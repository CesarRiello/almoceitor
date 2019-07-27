import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PlaceService } from '../../services/place.service'
import { ConfigService } from '../../services/config.service'
import { MatDialog } from '@angular/material'

@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.styl']
})

export class PlacesComponent implements OnInit {
  places = [];
  placesTypes = [];
  config = {};

  searchParam = 'ok';
  placeSubscription: Subscription;
  configSubscription: Subscription;

  constructor(
    public placeService: PlaceService,
    public configService: ConfigService,
    private dialog: MatDialog
    ) {

  }

  ngOnInit() {
    this.places = this.placeService.get()
    this.placeSubscription = this.placeService.placesUpdated.subscribe(()=>{
      this.places = this.placeService.get()
    })

    this.config = this.configService.get()
    this.configSubscription = this.configService.configUpdated.subscribe(()=>{
      this.config = this.configService.get()
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
    this.configSubscription.unsubscribe()
    this.placeSubscription.unsubscribe()
  }

  toggleConfig(name, place){
    if ((this.config[name] || []).includes(place.id)) {
      this.configService.remove(name, place.id)
    } else {
      this.configService.add(name, place.id)
    }
  }

}
