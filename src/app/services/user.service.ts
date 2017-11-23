import {Injectable} from '@angular/core';
import {Http,RequestOptions,Headers} from '@angular/http';
import 'rxjs/add/operator/map'

@Injectable()
export class UserService {
	private headers = new Headers({ 'Content-Type': 'application/json', 'charset':'UTF-8' });
	private options = new RequestOptions({ headers: this.headers });

	constructor(public http: Http) {
	}
	// Login
	getLoginName() {
		return this.http.get('/init/me', {}).map(res => res.json());
	}

	logOut(){
		return this.http.get('/logout', {});
	}

	getLoginRol() {
		return this.http.get('/init/me/roles', {}).map(res => res.json());
	}

	// devuelve usuarios

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

	// devuelve empleados o administradores
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

	
	getSecurityUserById(id:number){
		return this.http.get('/rest/person/security/'+id, {}).map(res => res.json());
	}


	// buscar por username y id sin seguridad
	getUserByUserName(username:string){
		return this.http.get('/rest/person/user/'+username, {}).map(res => res.json());
	}
	getUserLends(id:number){
		return this.http.get('/rest/lend/statistic/user/'+id, {}).map(res => res.json());
	}


	// lista de roles
	getRoles() {
		return this.http.get('/rest/username/roles', {}).map(res => res.json());
	}

	//habilitar desabilitar usuarios

	enableUser(data){
		this.http.put('/rest/username/enable/'+data, JSON.stringify(data)).subscribe();
	}

	disableUser(data){
		this.http.put('/rest/username/disable/'+data, JSON.stringify(data)).subscribe();
	}

	// roles
	addRol(data){
		this.http.post('/rest/person/security/authorize/role', JSON.stringify(data), this.options).subscribe();
	}

	removeRol(data){
		this.http.post('/rest/person/security/revoke/role', JSON.stringify(data), this.options).subscribe();
	}
	

}


