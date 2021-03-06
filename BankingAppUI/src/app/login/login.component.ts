import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
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
  submitted:boolean;
  loading:boolean;

  message:string;
  invalid:boolean;

  constructor(
    private auth:AuthenticationService, 
    private router:Router,
    private app:AppComponent,
    private formBuilder:FormBuilder
  ) { 
    // redirect to home if already logged in
    if (this.auth.currentUserValue) { 
      this.router.navigate(['/']);
    }
  }

  get f() { return this.loginForm.controls }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['',Validators.required],
      password: ['',Validators.required]
    });

    this.submitted = false;
    this.loading = false;
    this.invalid = false;
  }

  onSubmit(){
    this.submitted = true;
    if (this.loginForm.valid){
      this.loading = true;
      this.auth.login(this.loginForm.value.username, this.loginForm.value.password)
      .subscribe(data => {
        if (data) {
          this.app.displayMessage("You have been logged in!", 10);
          this.router.navigate(['/']);
        } else {
          this.invalid = true;
          this.message = "Invalid Username or Password";
          this.loading = false;
        }
      }, error => {
        this.invalid = true;
        this.message = "Invalid Username or Password";
        this.loading = false;
      });
    }
  }

  close(){
    this.invalid = false;
    this.message = null;
  }
}
