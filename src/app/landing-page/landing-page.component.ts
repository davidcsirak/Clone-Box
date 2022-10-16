import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
})
export class LandingPageComponent implements OnInit {
  userEmail: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fireAuth: AngularFireAuth
  ) {}

  ngOnInit(): void {
    this.fireAuth.authState.subscribe((user) => {
      if (user != null) {
        this.userEmail = user.email;
      } else {
        this.userEmail = null;
      }
    });
  }

  onCreateAccount() {
    this.authService.logout();
  }

  onRedirectOrder() {
    this.router.navigate(['/offer']);
  }

  onRedirectOrderHistory() {
    this.router.navigate(['/order-history']);
  }
}
