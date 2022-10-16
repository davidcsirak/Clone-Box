import { Component, OnDestroy, OnInit } from '@angular/core';
import { CalculatorService } from '../../shared/services/calculator.service';
import { CalculationResult } from '../../model/calculationResult.model';
import { GlobalService } from '../../shared/services/global.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Order } from '../../model/order.model';
import { UsersService } from '../../shared/services/users.service';
import { EmailService } from '../../shared/services/email.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent implements OnInit, OnDestroy {
  calcResult: CalculationResult;
  orderForm: FormGroup;
  PhoneNumberFormat = PhoneNumberFormat;
  preferredCountries: CountryISO[] = [
    CountryISO.Hungary,
    CountryISO.Romania,
    CountryISO.Germany,
  ];
  currentUserUid: string;

  constructor(
    private calcService: CalculatorService,
    private globalService: GlobalService,
    private fireAuth: AngularFireAuth,
    private userService: UsersService,
    private emailService: EmailService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.calcResult = this.globalService.getCalcResult();
    this.fireAuth.authState.subscribe((user) => {
      if (user && user.uid) {
        this.orderForm.patchValue({ emailInput: user.email });
        this.currentUserUid = user.uid;
      } else {
        this.currentUserUid = null;
      }
    });
    this.initForm();
  }

  initForm() {
    this.orderForm = new FormGroup({
      companyName: new FormControl(null, [Validators.required]),
      contactPerson: new FormControl(null, [Validators.required]),
      emailInput: new FormControl(null, [
        Validators.required,
        Validators.email,
      ]),
      phone: new FormControl(null, [Validators.required]),
      address: new FormControl(null, [Validators.required]),
    });
  }

  onSubmit() {
    console.log(this.calcResult);
    console.log(this.orderForm.value);
    console.log(this.currentUserUid, 'userid');

    const order = new Order(
      this.calcResult,
      this.orderForm.value.companyName,
      this.orderForm.value.contactPerson,
      this.orderForm.value.emailInput,
      this.orderForm.value.phone.internationalNumber,
      this.orderForm.value.address,
      Date.now()
    );

    if (this.currentUserUid) {
      this.userService
        .saveUserOrder(this.currentUserUid, order)
        .then(() => {
          this.sendOrder(order);
        })
        .catch((err) => {
          alert('Something went wrong while ordering. Try again!');
          this.router.navigate(['/offer']);
        });
    } else {
      this.sendOrder(order);
    }
  }

  sendOrder(order: Order): void {
    this.emailService
      .SendOrderEmail(order)
      .then(() => {
        this.router.navigate(['/order-successfully']);
      })
      .catch((err) => {
        alert('Something went wrong while ordering. Try again!');
        this.router.navigate(['/offer']);
      });
  }

  ngOnDestroy(): void {
    this.globalService.removeCalcResult();
  }
}
