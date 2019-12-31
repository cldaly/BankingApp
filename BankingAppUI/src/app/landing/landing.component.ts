import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  currentUser:User;

  constructor(private router:Router, private auth:AuthenticationService, private app:AppComponent){
    this.auth.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnInit() {
    console.log(this.currentUser);
    if (this.currentUser && this.currentUser.account === 'admin' ) {
      this.router.navigate(['/admin']);
    } else if (this.currentUser) {
      this.router.navigate(['/home']);
    } else {
      this.app.message = null;
    }
  }

}
