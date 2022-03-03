import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Credentials } from '../services/auth.service';
import { Router } from '@angular/router';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  credentials: Credentials = new Credentials();
  errorInfo = '';
  alertVisible = false;


  constructor(private  router: Router, private authService: AuthService, private userService: UsersService) { }

  login() {
    this.authService.login(this.credentials)

      .then(() => { this.router.navigate(['/products']); })

      .catch(err => {this.errorInfo = err.message; this.showAlert(); });
  }

  register() {
    this.authService.register(this.credentials)

      .then(() => { this.router.navigate(['/products']); })

      .catch(err => {this.errorInfo = err.message; this.showAlert(); });
  }

  showAlert() {
    this.alertVisible = true;
  }

  hideAlert() {
    this.alertVisible = false;
  }
}
