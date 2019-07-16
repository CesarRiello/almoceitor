import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.styl']
})
export class HeaderComponent implements OnInit {
  @Output() sidebarToggle = new EventEmitter();
  back = false;

  constructor(private router: Router) {
    router.events.subscribe(event => {
      if(event instanceof NavigationStart) {
        console.log('nnn', event.url);
        this.back = event.url.includes('/restaurante/') ? true : false;

      }
    });
   }

  ngOnInit() {
  }

  onToggleSidebar(){
    this.sidebarToggle.emit()
  }

}
