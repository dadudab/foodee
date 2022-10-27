import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isSidebarOpen: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  onToggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

}
