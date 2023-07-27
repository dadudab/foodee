import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
})
export class DashboardPageComponent implements OnInit {
  isAdmin!: boolean;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    if (this.authService.user.value?.isAdmin) {
      this.isAdmin = true;
    } else {
      this.isAdmin = false;
    }
  }

  onNavigate(path: string): void {
    this.router.navigate([`/dashboard/${path}`]);
  }
}
