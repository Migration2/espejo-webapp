import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
	roles:any;
	showRoles:boolean=false;
	
	constructor(private activedRoute:ActivatedRoute, private userService:UserService, private router:Router) { 
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
		this.userService.getRoles().subscribe(respuestaRoles =>{
			this.roles = respuestaRoles;			
		});

	}

	ngOnInit() {
		
	}
	
	updateRoles(){
		for (let i = 0; i < this.roles.length ; ++i) {
			let rol=(<HTMLInputElement>document.getElementById(this.roles[i].role));
			for (var j = 0; j < this.dataSecurity.userRole.length ; j++) {
				if (this.roles[i].role == this.dataSecurity.userRole[j].authority) {
					if (!rol.checked){
						this.userService.removeRol({'role':rol.value, 'user':this.dataSecurity.id});
					}
				}											
			}
			if (rol.checked){
				let a:boolean=false;
				for (var j = 0; j < this.dataSecurity.userRole.length ; j++) {
					if (this.roles[i].role == this.dataSecurity.userRole[j].authority) {
						a=true;
					}
				}
				if (!a) {
					this.userService.addRol({'role':rol.value, 'user':this.dataSecurity.id});
				}				
			}			
			this.router.navigate(['administrarEmpleados']);
		}
	}

	disableUser(){
		this.userService.disableUser(this.dataSecurity.username);
		this.router.navigate(['administrarEmpleados']);
	}
	enableUser (){
		this.userService.enableUser(this.dataSecurity.username);
		this.router.navigate(['administrarEmpleados']);
	}

	activarRoles (){
		this.showRoles=true;
		for (let i = 0; i < this.roles.length ; ++i) {
			let rol=(<HTMLInputElement>document.getElementById(this.roles[i].role));
			for (var j = 0; j < this.dataSecurity.userRole.length ; j++) {
				if (this.roles[i].role == this.dataSecurity.userRole[j].authority) {
					rol.checked=true;
				}
			}
		}
	}

}
