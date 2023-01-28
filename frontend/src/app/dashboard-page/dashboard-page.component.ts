import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
})
export class DashboardPageComponent {
  constructor(private router: Router) {}

  onNavigate(path: string): void {
    this.router.navigate([`/dashboard/${path}`]);
  }
}
