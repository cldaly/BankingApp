import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading:boolean = false;
  submitted:boolean = false;

  username:FormControl;
  password:FormControl;

  constructor() { }

  ngOnInit() {
    this.username = new FormControl('',Validators.required);
    this.password = new FormControl('',Validators.required);
    this.loginForm = new FormGroup({
      username: this.username,
      password: this.password
    });
  }


  onSubmit(){
    console.log(this.loginForm.value);
    this.submitted = true;
    if (this.loginForm.valid){
      this.loading = true;
    }
    
  }

}
