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

  constructor(private http: HttpClient) { }

  login(username:string, password:string) {
    return this.http.post<any>('http://localhost:8080/users/authenticate',{ username, password });
  }
}
