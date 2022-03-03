import { Injectable } from '@angular/core';
import { UserRole } from '../model/userRole';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})

export class UsersService {

  private dbPath = '/users';

  constructor(private db: AngularFirestore) {
  }

  getUserRoles() {
    return this.db.collection<UserRole>(this.dbPath).valueChanges({ idField: 'key' });
  }


}
