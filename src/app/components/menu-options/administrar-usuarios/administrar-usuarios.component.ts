import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { Observable, Subject } from 'rxjs/Rx';
import { DataSource } from '@angular/cdk/table';
import { CollectionViewer } from '@angular/cdk/collections';
import { PageEvent } from '@angular/material';

@Component({
	selector: 'app-administrar-usuarios',
	templateUrl: './administrar-usuarios.component.html',
	styleUrls: ['./administrar-usuarios.component.scss'],
	providers: [UserService]
})
export class AdministrarUsuariosComponent implements OnInit {

	
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
	}

	ngOnInit() {
		this.getUsersData(this.pageNumber, this.pageSize);
	}

	userInformation(userName: any) {
		this.router.navigate(['usuario', userName]);
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
