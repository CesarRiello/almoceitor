import { Component, OnInit } from '@angular/core'
import { ConfigService } from '../../services/config.service'

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.styl']
})
export class ConfigComponent implements OnInit {
  config = {favorites:[], blacklist:[], visited:[]};
  configSubscription: Subscription;

  constructor(
    public configService: ConfigService
    ) { }

  ngOnInit() {
    this.config = {...this.config, ...this.configService.get()}
    this.configSubscription = this.configService.configUpdated.subscribe(()=>{
      this.config = {...this.config, ...this.configService.get()}
    })
  }

  OnDestroy(){
    this.configSubscription.unsubscribe()
  }

  clean(name){
    this.configService.clean(name)
  }

}
