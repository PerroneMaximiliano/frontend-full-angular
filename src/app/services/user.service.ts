import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  identity: any = null;
  token: string = null;

  constructor() { }

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
}
