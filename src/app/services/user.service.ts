import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  identity: any = null;
  token: string = null;
  baseURL = environment.apiURL;

  constructor(private http: HttpClient) { }

  getIdentity() {
    let identityLS = JSON.parse(localStorage.getItem('identity'));

    if (identityLS != 'undefined') {
      this.identity = identityLS;
    }

    return this.identity;
  }

  getToken() {
    let tokenLS = JSON.parse(localStorage.getItem('token'));

    if (tokenLS != 'undefined') {
      this.token = tokenLS;
    }

    return this.token;
  }

  login(user: User) {
    const url = this.baseURL + 'login';
    return this.http.post<any>(url, user)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Handle API errors
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error.err.message}`);
    }
    // return an observable with a user-facing error message
    return throwError(error.error);
  };
}
