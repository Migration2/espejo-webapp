import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { EmpleadoModel } from '../../../models/empleado.model';

@Component({
	selector: 'app-empleado',
	templateUrl: './empleado.component.html',
	styleUrls: ['./empleado.component.scss'],
	providers: [UserService]
})
export class EmpleadoComponent implements OnInit {
	dataEmpleado = new EmpleadoModel;
	private idEmpleado;
	
	constructor(private activedRoute:ActivatedRoute, private userService:UserService) { 
		this.activedRoute.params.subscribe(params=>{
			this.idEmpleado = params.id;
		});

		this.userService.getUserById(this.idEmpleado).subscribe(response => {
			 this.dataEmpleado = response;
			 	});
	}

	ngOnInit() {
	}

}
