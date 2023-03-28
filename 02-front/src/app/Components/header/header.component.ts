import { Component, OnInit, OnChanges, SimpleChanges  } from '@angular/core';
import { Router } from "@angular/router";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit  {
  name = localStorage.getItem("userName");
  userIsAdmin = localStorage.getItem("role");

  userIsLogged: boolean = false;

  isCheckPage: boolean = false;

  constructor(private router: Router) {}

  ngOnInit() {
    const time = new Date();
    console.log(`${time.getMinutes()}:${time.getSeconds()}`);
    this.navBarHandler();
  }
  
  navBarHandler() {
    this.router.events.subscribe((val: any) =>{
      if(val.url) {
        const token = localStorage.getItem('Token');
        const adminPage = val.url.includes('admin');
        const userPage = val.url.includes('shopping');

        if(token && adminPage || token && userPage){
          this.userIsLogged = true;
          this.userIsAdmin = localStorage.getItem('role');
          this.name = localStorage.getItem("userName");

          }else if(!token && !this.isCheckPage && adminPage || !token && !this.isCheckPage && userPage){
            this.router.navigate(['/check-user']);
            this.userIsLogged = false;
            this.isCheckPage = true;
        }
      }
    })
  }
  
  logout() {
    localStorage.removeItem("Token");
    localStorage.removeItem("role");
    localStorage.removeItem("userName");
    localStorage.removeItem("userID");
    this.userIsLogged = false;
    this.router.navigate(['/login']);
  }
}


