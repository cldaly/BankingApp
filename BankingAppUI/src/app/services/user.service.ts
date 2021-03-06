import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user';
import { map } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient, private auth:AuthenticationService) { }

  register(user:User) {
    return this.http.post<any>('http://localhost:8080/users/add', user);
  }

  getUserData(){
    return this.http.get('http://localhost:8080/users');
  }
}
