import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from '../auth/auth.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isAuthenticated: boolean;

  constructor(
    private fireAuth: AngularFireAuth,
    private authService: AuthService,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.fireAuth.authState.subscribe((user) => {
      if (user != null) {
        this.isAuthenticated = true;
      } else {
        this.isAuthenticated = false;
      }
    });
  }

  onLogOut() {
    if (this.isAuthenticated) {
      this.authService.logout();
    }
  }

  onLanguageChange(lang: string) {
    this.translate.use(lang);
  }
}
