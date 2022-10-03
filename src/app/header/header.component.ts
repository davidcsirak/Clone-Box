import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from '../auth/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { UsersService } from '../shared/services/users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isAuthenticated: boolean;
  currentUserUid: any = null;

  constructor(
    private fireAuth: AngularFireAuth,
    private authService: AuthService,
    private translate: TranslateService,
    public usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.fireAuth.authState.subscribe((user) => {
      if (user && user.uid) {
        this.isAuthenticated = true;
        this.currentUserUid = user.uid;
      } else {
        this.isAuthenticated = false;
        this.currentUserUid = null;
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
