import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading:boolean;

  username:FormControl;
  password:FormControl;

  message:string;
  invalid:boolean;

  constructor(
      private auth:AuthenticationService, 
      private router:Router,
      private app:AppComponent
    ) { }

  ngOnInit() {
    this.username = new FormControl('',Validators.required);
    this.password = new FormControl('',Validators.required);
    this.loginForm = new FormGroup({
      username: this.username,
      password: this.password
    });
    this.loading = false;
    this.invalid = false;
  }

  onSubmit(){
    if (this.loginForm.valid){
      this.loading = true;
      this.auth.login(this.loginForm.value.username, this.loginForm.value.password)
      .subscribe(data => {
        if (data) {
          this.app.message = "You have been logged in!"
          this.router.navigate(['/']);
        } else {
          this.app.message = null;
          this.invalid = true;
          this.message = "Invalid Username or Password";
        }
      }, error => {
        this.invalid = true;
        this.message = "Something Went Wrong...";
      });
      this.loading = false;
    }
  }

  close(){
    this.invalid = false;
    this.message = null;
  }
}
