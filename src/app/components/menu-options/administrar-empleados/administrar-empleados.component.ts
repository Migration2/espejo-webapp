import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { Observable, Subject } from 'rxjs/Rx';
import { DataSource } from '@angular/cdk/table';
import { EmpleadoModel } from '../../../models/empleado.model';
import { PageEvent } from '@angular/material';

@Component({
	selector: 'app-administrar-empleados',
	templateUrl: './administrar-empleados.component.html',
	styleUrls: ['./administrar-empleados.component.scss'],
	providers: [UserService]
})
export class AdministrarEmpleadosComponent implements OnInit {
	dtOptions: any = {};
	dataUsuarios:Array<any>=[];
	dtTrigger = new Subject();
	mostrar:boolean = false;

	//Pagination data
	data: any;
	employeesDataSource: EmployeesDataSource;
	displayedColumns = ['Nombre', 'Documento', 'Fecha Registro', 'Celular', 'Habilitado'];
	//pagination
	lenght: number = 0;
	pageSize: number = 10;
	pageNumber: number = 1;
	pageSizeOptions = [5, 10, 20, 50, 100];

	constructor(private router:Router, private userService:UserService) { 
		this.userService.getEmployees().subscribe(response => {
			this.dataUsuarios = response;
			
			this.employeesDataSource = new EmployeesDataSource(response);
			this.dtTrigger.next();
			this.mostrar = true;
		});
	}

	ngOnInit() {

		// this.loadEmployeesData();

		this.dtOptions = {
			columnDefs: [
			{
				targets: [ 2 ],
				// visible: false,
				searchable: false
			}],
			responsive: true
		};
	}

	loadEmployeesData(){
		this.data = this.userService.getEmployeesWithPaginator(this.pageSize, this.pageNumber);
		this.data.subscribe(response => {
			console.log(response);
			this.setPagination(response['total_items'], response['page'], response['page_size']);
			this.employeesDataSource = new EmployeesDataSource(response.content)
		})
	}

	setPagination(lenght: number, pageIndex: number, pageSize: number) {
		this.lenght = lenght;
		this.pageNumber = pageIndex;
		this.pageSize = pageSize;
	}

	handlePage(pageEvent : PageEvent){
        this.pageSize = pageEvent.pageSize;
		this.pageNumber = pageEvent.pageIndex + 1;
		this.loadEmployeesData();
    }

	informacionUsuario(userId:number){
		this.router.navigate(['empleado',userId]);
	}

}

export class EmployeesDataSource extends DataSource<any>{
	constructor(private employees : any[]){
		super();
	}

	connect(): Observable<any[]> {
		return Observable.of(this.employees);
	}

	disconnect(){}
}
