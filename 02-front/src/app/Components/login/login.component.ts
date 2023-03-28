import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { User } from 'src/app/Models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginCorrect: boolean = false;
  @Output() updateIsLogged = new EventEmitter<boolean>();

  user: User[] = [];

  error = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onLogin(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const userName = form.value.userName;
    const password = form.value.password;

    this.authService.login(userName, password).subscribe((user: any) => {
      this.error = ''
      this.user = user.token;
      console.log(user.data.user.userID);

      localStorage.setItem("Token", user.token);
      localStorage.setItem("role", user.data.user.role);
      localStorage.setItem("userName", user.data.user.userName);
      localStorage.setItem("userID", user.data.user.userID);
      this.router.navigate(['/check-user']);

    }, (err) => {
      console.log(err.error.status);
      if (err.error.status === 'fail') {
        this.error = 'Username or password are incorrect!'
        console.log(this.error);
      }
    })
    form.reset();
  }

  //User can navigate to register page if he have an a account by clicking a button
  navigateToRegister = () => this.router.navigate(['/register']);
}

