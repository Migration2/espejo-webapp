import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { Observable } from 'rxjs/Rx';
import { DataSource } from '@angular/cdk/table';
import { PageEvent } from '@angular/material';
import { UserSecurityModel, UserSecurityValidateInfo } from '../../../models/usuario.model';

@Component({
	selector: 'app-administrar-usuarios',
	templateUrl: './administrar-usuarios.component.html',
	styleUrls: ['./administrar-usuarios.component.scss'],
	providers: [UserService]
})
export class AdministrarUsuariosComponent implements OnInit {

	@Input() isCallOtherComponent = false;
	@Output() userSelected : EventEmitter<any>;

	
	mostrar: boolean = false;
	usersDataSource: UsersDataSource;
	displayedColumns = ['Nombre', 'Documento', 'fechaRegistro', 'Validado', 'Habilitado', 'Tarjeta'];
	//PAGINATION
	lengthUsers: number = 0;
	pageSize: number = 10;
	pageNumber: number = 0;
	pageSizeOptions = [5, 10, 20, 50, 100];
	//filter
	filterValue:string = "";

	constructor(private router: Router, private userService: UserService) {
		this.userSelected = new EventEmitter();
	}

	ngOnInit() {
		this.getUsersData(this.pageNumber, this.pageSize);
	}

	userInformation(userName:string, enabled:boolean=false, validated:boolean=false, code:string="", idLoanActive:string="", userSecId:number | string){
		if(!enabled){
			enabled =false;
		}
		if(!validated){
			validated = false;
		}
		let userSecurityInfo:UserSecurityValidateInfo = new UserSecurityValidateInfo(enabled,validated, code, idLoanActive, userSecId);	
		
		this.userService.setDataUserSecurity(userSecurityInfo);
		this.router.navigate(['usuario', userName]);
	}

	handleUserSelected(userSelected:UserSecurityModel){
		if(this.isCallOtherComponent){
			this.userService.getUserByUserName(userSelected.username).subscribe(userResponse => {
				this.userSelected.emit(userResponse);
			}, 
			error => console.log(error));
		}else{
			this.userInformation(userSelected.username, userSelected.enabled, userSelected.validated, userSelected.code, userSelected.idLoanActive, userSelected.id)
		}	
	}

	handlePage(pageEvent: PageEvent) {
		this.pageSize = pageEvent.pageSize;
		this.pageNumber = pageEvent.pageIndex;
		if(this.filterValue === ""){
			this.getUsersData(this.pageNumber, this.pageSize);
		}else{
			this.getUsersDataById(this.pageNumber, this.pageSize, this.filterValue);
		}
	
	}

	searchUser():void{
		this.filterValue = this.filterValue.trim();
		
		if(this.filterValue === ""){
			this.getUsersData(this.pageNumber, this.pageSize);
		}else{
			this.getUsersDataById(0, this.pageSize, this.filterValue);
		}	
	}

	fillValueFilterUser(searchValue: string) {
		this.filterValue = searchValue.trim();
	}

	private getUsersData(pageNumber: number, pageSize: number) {
		this.userService.getUsersWithPagination(pageNumber, pageSize).subscribe(response => {
			this.usersDataSource = new UsersDataSource(response.content);
			this.lengthUsers = response.totalElements;
			this.mostrar = true;
		});
	}

	private getUsersDataById(pageNumber: number, pageSize: number, userId:string) {
		this.userService.findUsersByIdWithPagination(pageNumber, pageSize, userId).subscribe(response => {
			this.usersDataSource = new UsersDataSource(response.content);
			this.lengthUsers = response.totalElements;
			this.pageNumber = response.number;
		});
	}
}

export class UsersDataSource extends DataSource<any> {

	constructor(private users: any) {
		super();
	}

	connect(): Observable<any[]> {
		return Observable.of(this.users);
	}
	disconnect(): void {

	}

}
