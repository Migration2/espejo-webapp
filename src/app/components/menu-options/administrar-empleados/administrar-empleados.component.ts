import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { Subject } from 'rxjs/Rx';

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

	constructor(private router:Router, private userService:UserService) { 
		this.userService.getEmployees().subscribe(response => {
			this.dataUsuarios = response;
			this.dtTrigger.next();
			this.mostrar = true;
		});
	}

	ngOnInit() {
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

	informacionUsuario(userId:number){
		this.router.navigate(['empleado',userId]);
	}

}
