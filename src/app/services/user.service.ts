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
	getLoginName() { //devuelve solo username
		return this.http.get('/init/me', {}).map(res => res.json());
	}

	getInformationMe(){
		return this.http.get('/rest/person/security/me', {}).map(res => res.json());		
	}

	logOut(){
		return this.http.get('/logout', {});
	}

	getLoginRol() {
		return this.http.get('/init/me/roles', {}).map(res => res.json());
	}

	// devuelve usuarios

	getUsers(){
		return this.http.get('/rest/person/security/all', {}).map(res => res.json());
	}

	// devuelve empleados o administradores
	getEmployees(){
		return this.http.get('/rest/person/security/employees', {}).map(res =>  res.json());
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

	// changue password or pin
	changePassword(data){
		this.http.put('/rest/person/security/access', JSON.stringify(data), this.options).subscribe();
	}

	changePin(data){
		this.http.put('/rest/person/security/access', JSON.stringify(data), this.options).subscribe();
	}

	//update Usuario
	updateUser(data, securityID){
	this.http.put('/rest/person/'+securityID, JSON.stringify(data), this.options).subscribe();	
	}

}


