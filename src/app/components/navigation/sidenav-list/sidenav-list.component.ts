import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.styl']
})
export class SidenavListComponent implements OnInit {
  @Output() sidebarToggle = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onClose(){
    this.sidebarToggle.emit()
  }

}
