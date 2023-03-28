import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  error = null

  registerStatus: string = 'Step 1';
  citys = ['Choose a city', 'Jerusalem', 'Haifa', 'Tel-Aviv', 'Rishon-Lezion', 'Petah-Tikva', 'Ashdod', 'Netanya', 'Bnei Brak'];

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }


  onChangeStep() {
    if (this.registerStatus === 'Step 1') {
      this.registerStatus = 'Step 2'
    } else {
      this.registerStatus = 'Step 1'
    }
  }

  onSignUp(form: NgForm) {
    this.error = null;
    if (!form.valid) {
      return;
    }
    const id = form.value.id;
    const email = form.value.email;
    const password = form.value.password;
    const passwordConfirm = form.value.verifypassword;
    const city = form.value.city;
    const street = form.value.street;
    const fullName = form.value.fullname;
    const userName = form.value.userName;

    this.authService.signup(id, email, password, passwordConfirm, city, street, fullName, userName).subscribe((user: any) => {
      localStorage.setItem("Token", user.token);
      localStorage.setItem("id", user.data.user._id);
      localStorage.setItem("role", user.data.user.role);
      localStorage.setItem("userName", user.data.user.userName);
      this.router.navigate(['/shopping-list/DairyCheeseEggs']);
    }, (err) => {
      this.error = err.error.message;
    })
    form.reset();
  }

  //User can navigate to login page if he don't have an a account by clicking a button
  navigateToLogin = () => this.router.navigate(['/login']);
}
