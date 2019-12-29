import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading:boolean = false;

  username:FormControl;
  password:FormControl;

  invalid:boolean;

  constructor(private auth:AuthenticationService) { }

  ngOnInit() {
    this.username = new FormControl('',Validators.required);
    this.password = new FormControl('',Validators.required);
    this.loginForm = new FormGroup({
      username: this.username,
      password: this.password
    });

    this.invalid = false;
  }

  onSubmit(){
    if (this.loginForm.valid){
      this.loading = true;
      this.auth.login(this.loginForm.value.username, this.loginForm.value.password)
      .subscribe(data => {
        if (data) {
          console.log(data);
        } else {
          this.invalid = true;
          this.loginForm.reset;
        }
      });
      this.loading = false;
    }
  }

  close(){
    this.invalid = false;
  }
}
