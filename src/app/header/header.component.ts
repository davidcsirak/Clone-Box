import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isAuthenticated: boolean;

  constructor(
    private fireAuth: AngularFireAuth,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.fireAuth.authState.subscribe((user) => {
      if (user && user.uid) {
        this.isAuthenticated = true;
      } else {
        this.isAuthenticated = false;
      }
    });
  }

  onLogOut() {
    this.authService.logout();
  }
}
