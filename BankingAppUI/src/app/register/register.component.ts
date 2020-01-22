import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { PasswordMatch } from '../_helpers/pass-match.validator';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  loading:boolean;

  accounts = ["checking","savings"];

  message:string;
  invalid:boolean;

  constructor(
      private auth:AuthenticationService, 
      private router:Router,
      private app:AppComponent,
      private formBuilder:FormBuilder,
      private userService:UserService
  ) { 
    if (this.auth.currentUserValue) { 
      this.router.navigate(['/bank']);
    }
  }

  close() {
    this.invalid = false;
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name : ['', Validators.required],
      email : ['', [Validators.required, Validators.email]],
      address : ['', Validators.required],
      account : ['', Validators.required],
      username : ['',Validators.required],
      password : ['',[Validators.required, Validators.minLength(6)]],
      confPassword : ['',[Validators.required, Validators.minLength(6)]]
    }, {
      validator : PasswordMatch('password', 'confPassword')
    });
    this.loading = false;
    this.invalid = false;
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit(){
    this.submitted = true;
    if (this.registerForm.valid) {
      this.loading = true;
      let newUser = new User(
        this.registerForm.value.name, 
        this.registerForm.value.username, 
        this.registerForm.value.password, 
        this.registerForm.value.email, 
        this.registerForm.value.address, 
        this.registerForm.value.account
      );
      this.userService.register(newUser).subscribe(data => {
        this.auth.login(newUser.username, newUser.password).subscribe(data => {
          this.app.displayMessage("You have been registered!",10);
          this.router.navigate(['/bank']);
        });
      }, error => {
        console.log(error);
        this.invalid = true;
        this.message = error.error.message;
      })
    }
    this.loading = false;
    // this.loading = true;
  }

}
