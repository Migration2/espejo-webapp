import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { Observable, Subject } from 'rxjs/Rx';
import { DataSource } from '@angular/cdk/table';
import { EmpleadoModel } from '../../../models/empleado.model';
import { PageEvent } from '@angular/material';
import { PaginatePipe } from '../../../pipes/paginate.pipe';

@Component({
	selector: 'app-administrar-empleados',
	templateUrl: './administrar-empleados.component.html',
	styleUrls: ['./administrar-empleados.component.scss'],
	providers: [UserService]
})
export class AdministrarEmpleadosComponent implements OnInit {
	dtOptions: any = {};
	dataUsuarios:Array<any>=[];
	employesDataForView:Array<any>=[];
	dtTrigger = new Subject();
	mostrar:boolean = false;

	//Pagination data
	data: any;
	employeesDataSource: EmployeesDataSource;
	displayedColumns = ['Nombre', 'Documento', 'Fecha Registro', 'Celular', 'Habilitado'];
	//pagination
	private paginatorPipe:PaginatePipe;
	length: number = 0;
	pageSize: number = 10;
	pageNumber: number = 0;
	pageSizeOptions = [5, 10, 20, 50, 100];

	constructor(private router:Router, private userService:UserService) { 
		this.paginatorPipe = new PaginatePipe();
		this.userService.getEmployees().subscribe(response => {
			this.dataUsuarios = response;
			this.loadEmployesData();
			// this.dtTrigger.next();
			
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

	loadEmployesData(){
		this.data = this.userService.getEmployees().subscribe(response => {
			this.dataUsuarios = response;
			this.paginateEmployesData(this.dataUsuarios, this.pageNumber, this.pageSize);
			this.mostrar = true;
		});
	}

	private paginateEmployesData(employesData:Array<any>, pageNumber:number, pageSize:number){
		this.length = employesData.length;
		this.employesDataForView = this.paginatorPipe.transform(employesData, pageSize, pageNumber);
		this.employeesDataSource = new EmployeesDataSource(this.employesDataForView);
	}

	handlePage(pageEvent : PageEvent){
        this.pageSize = pageEvent.pageSize;
		this.pageNumber = pageEvent.pageIndex;
		this.paginateEmployesData(this.dataUsuarios, this.pageNumber, this.pageSize);
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
