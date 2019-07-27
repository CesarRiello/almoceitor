import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { PlaceService } from '../../services/place.service'
import { ConfigService } from '../../services/config.service'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.component.html',
  styleUrls: ['./place-detail.component.styl']
})
export class PlaceDetailComponent implements OnInit {
  slug = '';
  place = {name:'', modality:'', id:'', slug:''};
  config = {};
  placeSubscription: Subscription;
  configSubscription: Subscription;

  constructor(
    public placeService: PlaceService,
    public configService: ConfigService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.slug = this.route.snapshot.paramMap.get("slug");
    this.place = this.placeService.getBySlug(this.slug);

    this.config = this.configService.get()
    this.configSubscription = this.configService.configUpdated.subscribe(()=>{
      this.config = this.configService.get()
    })

  }

  OnDestroy(){
    this.configSubscription.unsubscribe()
  }

  toggleConfig(name, place){
    if ((this.config[name] || []).includes(place.id)) {
      this.configService.remove(name, place.id)
    } else {
      this.configService.add(name, place.id)
    }
  }

}
