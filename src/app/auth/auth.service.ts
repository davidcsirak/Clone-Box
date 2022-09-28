import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { GoogleAuthProvider } from '@angular/fire/auth';
import { collectionSnapshots } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  errorMessage = new Subject<string>();
  isLoading = new Subject<boolean>();
  provider = new GoogleAuthProvider();

  constructor(private fireAuth: AngularFireAuth, private router: Router) {}

  signUp(email: string, password: string) {
    this.fireAuth
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        console.log(res.user);
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
    this.fireAuth.authState.subscribe((user) => {
      if (user && user.uid) {
        this.fireAuth.signOut().then((r) => {
          console.log('logged out!');
          this.router.navigate(['/auth']);
        });
      }
    });
  }

  signInWithGoogle() {
    this.fireAuth
      .signInWithPopup(this.provider)
      .then((res) => {
        console.log(res);
        this.isLoading.next(false);
        this.router.navigate(['']);
      })
      .catch((errorRes) => {
        this.isLoading.next(false);
        this.handleError(errorRes.code);
        console.log(errorRes);
      });
  }

  private handleError(errorCode: any) {
    let errorMessage = 'An unknown error occurred!';
    if (!errorCode) {
      this.errorMessage.next(errorMessage);
    } else {
      switch (errorCode) {
        case 'auth/email-already-in-use':
          errorMessage = 'This email exists already!';
          break;
        case 'auth/invalid-email':
          errorMessage = 'This email does not exist!';
          break;
        case 'auth/wrong-password':
          errorMessage = 'This password is not correct!';
          break;
        case 'auth/user-not-found':
          errorMessage = 'This email does not exist!';
          break;
        case 'auth/too-many-requests':
          errorMessage =
            'Access to this account has been temporarily disabled due to many failed login attempts. Try again later';
          break;
      }
      this.errorMessage.next(errorMessage);
    }
  }
}
