import { Injectable } from '@angular/core';
import { User } from '../../model/user.model';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  //private userDoc: AngularFirestoreDocument<User>;
  private userCol: AngularFirestoreCollection<User>;
  //userColObs: Observable<User[]>;
  //userDocObs: Observable<User>;

  constructor(private afs: AngularFirestore) {
    //this.userDoc = this.afs.doc('users');
    //this.userCol = this.afs.collection('users');
    //this.userDocObs = this.userDoc.valueChanges();
    //this.userColObs = this.userCol.valueChanges();
  }

  addUser(user: User) {
    this.userCol.add(user).then((userRef) => {
      console.log('User created in database!', userRef);
    });
  }

  getCurrentUserData(currentUid: string) {
    console.log(
      this.afs
        .collection('users', (ref) => ref.where('uid', '==', currentUid))
        .get()
        .subscribe((res) => {
          res.forEach((doc) => {
            console.log(doc.data());
          });
        })
    );
  }
}
