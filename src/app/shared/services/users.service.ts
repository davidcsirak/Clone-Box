import { Injectable } from '@angular/core';
import { User } from '../../model/user.model';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private userColl: AngularFirestoreCollection<User>;

  constructor(private afs: AngularFirestore) {
    this.userColl = afs.collection('users');
  }

  addUser(user: User) {
    this.userColl.add(user).then((userRef) => {
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
