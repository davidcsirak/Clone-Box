import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { GoogleAuthProvider } from '@angular/fire/auth';
import { UsersService } from '../shared/services/users.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  errorMessage = new Subject<string>();
  isLoading = new Subject<boolean>();
  provider = new GoogleAuthProvider();

  constructor(
    private fireAuth: AngularFireAuth,
    private router: Router,
    private usersService: UsersService
  ) {}

  signUp(email: string, password: string) {
    this.fireAuth
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        //creating user in database
        this.usersService.addUser({ uid: res.user.uid, email: res.user.email });

        this.isLoading.next(false);
        this.router.navigate(['']);
      })
      .catch((errorRes) => {
        this.isLoading.next(false);
        this.handleError(errorRes.code);
      });
  }

  logIn(email: string, password: string) {
    this.fireAuth
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        this.isLoading.next(false);
        this.router.navigate(['']);
      })
      .catch((errorRes) => {
        this.isLoading.next(false);
        this.handleError(errorRes.code);
      });
  }

  logout() {
    this.fireAuth.signOut().then((r) => {
      console.log('logged out!');
      this.router.navigate(['/auth']);
    });
  }

  signInWithGoogle() {
    this.fireAuth
      .signInWithPopup(this.provider)
      .then((res) => {
        //creating user in database
        this.usersService.addUser({ uid: res.user.uid, email: res.user.email });

        this.isLoading.next(false);
        this.router.navigate(['']);
      })
      .catch((errorRes) => {
        this.isLoading.next(false);
        this.handleError(errorRes.code);
      });
  }

  private handleError(errorCode: any) {
    let errorMessage = 'UNKNOWN_ERROR';
    if (!errorCode) {
      this.errorMessage.next(errorMessage);
    } else {
      switch (errorCode) {
        case 'auth/email-already-in-use':
          errorMessage = 'EMAIL_EXISTS_ERROR';
          break;
        case 'auth/invalid-email':
          errorMessage = 'INVALID_EMAIL_ERROR';
          break;
        case 'auth/wrong-password':
          errorMessage = 'WRONG_PASSWORD_ERROR';
          break;
        case 'auth/user-not-found':
          errorMessage = 'EMAIL_NOT_EXISTS_ERROR';
          break;
        case 'auth/too-many-requests':
          errorMessage = 'TOO_MANY_REQUESTS_ERROR';
          break;
      }
      this.errorMessage.next(errorMessage);
    }
  }
}
