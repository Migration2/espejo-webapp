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
		return this.http.get('/rest/person/security/all', {}).map(res => {let c= res.json();
			let dataFiltrada=c.filter(function (data) {
				let rol=0;
				for (let i = data.userRole.length-1; i >= 0; i--) {
					if (data.userRole[i].authority=="ROLE_ADMIN" || data.userRole[i].authority=="ROLE_EMPLOYEE"){
						rol=1;
					}
				};				
				return rol == 0;
			});
			return dataFiltrada});
	}

	getEmployees(){
		return this.http.get('/rest/person/security/all', {}).map(res => {let c= res.json();
			let dataFiltrada=c.filter(function (data) {
				let rol=0;
				for (let i = data.userRole.length-1; i >= 0; i--) {
					if (data.userRole[i].authority=="ROLE_ADMIN" || data.userRole[i].authority=="ROLE_EMPLOYEE"){
						rol=1;
					}
				};				
				return rol == 1;
			});
			return dataFiltrada});
	}

	

	getUserByUserName(username:string){
		return this.http.get('/rest/person/user/'+username, {}).map(res => res.json());
	}
}


