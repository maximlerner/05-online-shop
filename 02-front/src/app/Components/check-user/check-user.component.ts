import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-check-user',
  templateUrl: './check-user.component.html',
  styleUrls: ['./check-user.component.css']
})
export class CheckUserComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    if (localStorage.getItem("role") === 'admin') {
      this.router.navigate(['/adminPage']);
    } else if (localStorage.getItem("role") === 'user') {
      this.router.navigate(['/shopping-list/DairyCheeseEggs']);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
