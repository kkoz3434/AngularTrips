import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {User} from 'firebase';
import {UsersService} from '../services/users.service';

export class Credentials {
  email = '';
  password = '';
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  usersRoles = new Map<string, string[]>();

  constructor(private afAuth: AngularFireAuth, private usersService: UsersService) {
    this.usersService.getUserRoles().subscribe(roles => {
      roles.forEach(userRole => {
        this.usersRoles.set(userRole.email, userRole.roles);
      });
    });
  }

  get user(): User | null {
    return this.afAuth.auth.currentUser;
  }

  private checkAuthorization(user: User, allowedRoles: string[]): boolean {
    if (user) {
      return false;
    }
    const roles = this.usersRoles.get(user.email);
    if (roles == null) {
      return false;
    }
    for (const role of allowedRoles) {
      if (roles.includes(role)) {
        return true;
      }
    }
    return false;
  }

  isLoggedIn() {
    return this.user != null;
  }

  isUserAdmin(): boolean {
    return this.checkAuthorization(this.user, ['admin']);
  }

  canEdit(): boolean {
    return this.checkAuthorization(this.user, ['admin', 'editor']);
  }

  login({email, password}: Credentials) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  register({email, password}: Credentials) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  logout() {
    return this.afAuth.auth.signOut();
  }

}
