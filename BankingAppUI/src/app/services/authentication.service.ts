import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSubject:BehaviorSubject<User>;
  public currentUser:Observable<User>;

  constructor(private http: HttpClient) {
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
        this.currentUserSubject.next(data['jwt']);
      }
      return data['jwt'];
    }));
  }
  
  logout(){
    localStorage.clear();
    this.currentUserSubject.next(null);
  }
}
