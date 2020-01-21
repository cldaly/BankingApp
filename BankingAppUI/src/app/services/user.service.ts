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
    return this.http.post<any>('http://localhost:8080/users', user);
  }

  getUserData(){
    const token = localStorage.getItem('token');
    let header = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    }
    // .set('Content-Type', 'application/json')
    
    console.log(header)
    return this.http.get<User>('http://localhost:8080/users', header);
  }
}
