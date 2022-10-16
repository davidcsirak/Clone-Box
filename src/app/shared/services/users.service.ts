import { Injectable } from '@angular/core';
import { User } from '../../model/user.model';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Order } from '../../model/order.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private userColl: AngularFirestoreCollection<User>;

  constructor(private afs: AngularFirestore) {
    this.userColl = afs.collection('users');
  }

  saveUserOrder(userId: string, order: Order) {
    return new Promise((resolve, reject) => {
      this.getUserQuery(userId).then((res) => {
        const docRef = res.docs.shift();
        let oldOrderList = docRef.data().orders;
        oldOrderList.push(order);

        const newOrderList = oldOrderList.map((order) => {
          return Object.assign({}, order);
        });

        resolve(
          this.userColl.doc(docRef.id).update({
            orders: newOrderList,
          })
        );
      });
    });
  }

  getUserOrder(userId: string) {
    return new Promise((resolve) => {
      this.getUserQuery(userId).then((queryRes) => {
        const userDocRef = queryRes.docs.shift();
        resolve(userDocRef.data().orders);
      });
    });
  }

  getUserQuery(userId: string) {
    return this.userColl.ref.where('uid', '==', userId).limit(1).get();
  }

  checkAndAddUser(user: User) {
    this.userColl.ref
      .where('email', '==', user.email)
      .limit(1)
      .get()
      .then((queryRes) => {
        if (queryRes.docs.length == 0) {
          this.userColl.add(user).then((userRef) => {});
        }
      });
  }
}
