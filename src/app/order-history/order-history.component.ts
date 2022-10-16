import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { UsersService } from '../shared/services/users.service';
import { Order } from '../model/order.model';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css'],
})
export class OrderHistoryComponent implements OnInit {
  userOrders: Order[];
  isLoading: boolean;
  constructor(
    private fireAuth: AngularFireAuth,
    private userService: UsersService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.fireAuth.authState.subscribe((user) => {
      if (user && user.uid) {
        this.userService.getUserOrder(user.uid).then((orders: Order[]) => {
          if (orders) {
            this.userOrders = orders;
            this.isLoading = false;
          } else {
            this.userOrders = [];
            this.isLoading = false;
          }
        });
      }
    });
  }
}
