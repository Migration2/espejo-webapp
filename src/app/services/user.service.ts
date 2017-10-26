import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map'

@Injectable()
export class UserService {

	constructor(public http: Http) {
	}

	getLoginName() {
		return this.http.get('/init/me', {}).map(res => res.json());
	}

	getUsers(){
		return this.http.get('/rest/person', {}).map(res => res.json());
	}

	getemployees(){
		return this.http.get('/rest/person', {}).map(res => res.json());
	}

	getUserById(id:number){
		return this.http.get('/rest/person/'+id, {}).map(res => res.json());
	}
}
