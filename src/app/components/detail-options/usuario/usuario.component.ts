import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { UsuarioModel, UsuarioSecurityModel } from '../../../models/usuario.model';
import { Subject } from 'rxjs/Rx';


@Component({
	selector: 'app-usuario',
	templateUrl: './usuario.component.html',
	styleUrls: ['./usuario.component.scss'],
	providers: [UserService]
})
export class UsuarioComponent implements OnInit {
	dataSecurity = new UsuarioSecurityModel;
	dataUsuario = new UsuarioModel;
	prestamos:any;
	roles:any;
	private userId;
	dtTrigger = new Subject();
	dtOptions: DataTables.Settings = {};
	showRoles:boolean = false;

	constructor(private activedRoute:ActivatedRoute, private userService:UserService, private router:Router) { 
		this.activedRoute.params.subscribe(params=>{
			this.userId = params.id;
			this.userService.getSecurityUserById(this.userId).subscribe(responseSecurity=>{
				this.dataSecurity = responseSecurity;
				this.userService.getUserByUserName(this.dataSecurity.username).subscribe(responseUserName => {
					this.dataUsuario = responseUserName;
					this.userService.getUserLends(Number(this.dataUsuario.id)).subscribe(response => {
						this.prestamos=response;
						this.dtTrigger.next();
					});
				});
			});
		});

		this.userService.getRoles().subscribe(respuestaRoles =>{
			this.roles = respuestaRoles;
		});

	}

	ngOnInit() {
		this.dtOptions = {};
	}

	updateRoles(){
		for (let i = 0; i < this.roles.length ; ++i) {
			let rol=(<HTMLInputElement>document.getElementById(this.roles[i].role));
			if (rol.checked){
				this.userService.addRol({'role':rol.value, 'user':this.dataSecurity.id});
				this.router.navigate(['administrarUsuarios']);
			}
		}
	}

	disableUser(){
		this.userService.disableUser(this.dataSecurity.username);
		this.router.navigate(['administrarUsuarios']);
	}
	enableUser (){
		this.userService.enableUser(this.dataSecurity.username);
		this.router.navigate(['administrarUsuarios']);
	}

}
