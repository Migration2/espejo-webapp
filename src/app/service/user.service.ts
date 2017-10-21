import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

@Injectable()
export class UserService {

  constructor(private http: Http) {
  }

  getPrincipal() {
    return this.http.get('/init/me', {}).map(res => res.json());
  }
}
