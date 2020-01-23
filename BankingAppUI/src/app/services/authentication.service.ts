import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSubject:BehaviorSubject<User>;
  public currentUser:Observable<User>;

  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(username:string, password:string) {
    return this.http.post<any>('http://localhost:8080/users/authenticate',{ username, password }).pipe(map(data => {
      if (data) {
        localStorage.setItem('token', data['jwt']);
        this.http.get('http://localhost:8080/users').subscribe(user => {
          let currUser = new User(user['name'], user['username'], null, user['email'], user['address'], user['account'])
          currUser.balance = user['balance']
          currUser.status = user['status']
          currUser.numOfChecks = user['numOfChecks']
          console.log(currUser)
          this.currentUserSubject.next(currUser);
          localStorage.setItem('currentUser', JSON.stringify(currUser))
          this.router.navigate(['/bank'])
        })
      }
      return data['jwt'];
    }));
  }
  
  logout(){
    localStorage.clear();
    this.currentUserSubject.next(null);
  }
}
