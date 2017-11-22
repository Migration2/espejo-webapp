import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { EmpleadoModel } from '../../../models/empleado.model';
import { UsuarioSecurityModel } from '../../../models/usuario.model';

@Component({
	selector: 'app-empleado',
	templateUrl: './empleado.component.html',
	styleUrls: ['./empleado.component.scss'],
	providers: [UserService]
})
export class EmpleadoComponent implements OnInit {
	dataSecurity = new UsuarioSecurityModel;
	dataEmpleado = new EmpleadoModel;
	private idEmpleado;
	show:boolean=false;
	
	constructor(private activedRoute:ActivatedRoute, private userService:UserService) { 
		this.activedRoute.params.subscribe(params=>{
			this.idEmpleado = params.id;
			this.userService.getSecurityUserById(this.idEmpleado).subscribe(responseSecurity=>{
				this.dataSecurity = responseSecurity;
				this.userService.getUserByUserName(this.dataSecurity.username).subscribe(responseUserName => {
					this.dataEmpleado = responseUserName;
					this.show=true;
				});
			});
		});

		this.userService.getUserByUserName(this.idEmpleado).subscribe(response => {
			this.dataEmpleado = response;
		});
	}

	ngOnInit() {
	}

}
