import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { AuthComponent } from './auth/auth.component';
import {
  AngularFireAuthGuard,
  redirectLoggedInTo,
} from '@angular/fire/compat/auth-guard';
import { CalculatorComponent } from './calculator/calculator.component';

const redirectLoggedInToHome = () => redirectLoggedInTo(['']);

const routes: Route[] = [
  {
    path: '',
    component: LandingPageComponent,
  },
  {
    path: 'auth',
    component: AuthComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectLoggedInToHome },
  },
  {
    path: 'calculator',
    component: CalculatorComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
