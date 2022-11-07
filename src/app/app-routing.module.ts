import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { AuthComponent } from './auth/auth.component';
import {
  AngularFireAuthGuard,
  redirectLoggedInTo,
} from '@angular/fire/compat/auth-guard';
import { CalculatorComponent } from './calculator/calculator.component';
import { OfferComponent } from './offer/offer.component';
import { OrderComponent } from './offer/order/order.component';
import { OrderGuard } from './shared/guards/order.guard';
import { OrderSuccessfullComponent } from './offer/order/order-successfull/order-successfull.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { OrderHistoryGuard } from './shared/guards/order-history.guard';

const redirectLoggedInToHome = () => redirectLoggedInTo(['']);

const routes: Route[] = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: LandingPageComponent,
  },
  {
    path: 'auth',
    component: AuthComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectLoggedInToHome },
  },
  {
    path: 'order-history',
    component: OrderHistoryComponent,
    canActivate: [OrderHistoryGuard],
  },
  {
    path: 'order-successfully',
    component: OrderSuccessfullComponent,
  },
  {
    path: 'offer',
    component: OfferComponent,
    children: [
      {
        path: '',
        component: CalculatorComponent,
      },
      {
        path: 'order',
        component: OrderComponent,
        canActivate: [OrderGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
