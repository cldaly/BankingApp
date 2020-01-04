import { Component } from '@angular/core';
import { User } from './models/user';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentUser:User;
  title = 'My Banking App';
  message:string = null;

  constructor(private router:Router, private auth:AuthenticationService){
    this.auth.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

  logout(){
    this.auth.logout();
    this.router.navigate(['/login']);
    this.displayMessage("You have been logged out!",10);
  }

  close(){
    this.message = null;
  }

  displayMessage(message: string, seconds: number) {
    this.message = message;
    if (seconds > 0 ) {
      setTimeout(()=> {
        this.message = null;
      }, seconds * 1000);
    }
  }
}
