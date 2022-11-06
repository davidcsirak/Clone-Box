import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit, OnDestroy {
  authForm: FormGroup;
  isLoginMode = true;
  errorMessage: string = null;
  isLoading = false;
  errMessageSub: Subscription;
  isLoadingSub: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.initForm();
    this.errMessageSub = this.authService.errorMessage.subscribe((message) => {
      this.errorMessage = message;
    });
    this.isLoadingSub = this.authService.isLoading.subscribe((isLoading) => {
      this.isLoading = isLoading;
    });
  }

  initForm() {
    this.authForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  onSubmit() {
    if (!this.authForm.valid) {
      return;
    }
    const email = this.authForm.value.email;
    const password = this.authForm.value.password;
    this.isLoading = true;

    if (this.isLoginMode) {
      this.authService.logIn(email, password);
    } else {
      this.authService.signUp(email, password);
    }

    this.authForm.reset();
  }

  onGoogle() {
    this.isLoading = true;
    this.authService.signInWithGoogle();
    this.authForm.reset();
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
    this.authForm.reset();
  }

  ngOnDestroy(): void {
    this.errMessageSub.unsubscribe();
    this.isLoadingSub.unsubscribe();
  }

  closeError() {
    this.errorMessage = null;
  }
}
