import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { UsuarioModel, UsuarioSecurityModel, usuarioDataUpdate } from '../../../models/usuario.model';
import { Subject } from 'rxjs/Rx';


@Component({
	selector:'app-usuario',
	templateUrl: './usuario.component.html',
	styleUrls: ['./usuario.component.scss'],
	providers: [UserService]
})
export class UsuarioComponent implements OnInit {
	dataSecurity = new UsuarioSecurityModel;
	dataUsuario = new UsuarioModel;
	dataUsuarioUpdate = new usuarioDataUpdate;
	prestamos:any;
	roles:any;
	private userId;
	dtTrigger = new Subject();
	dtOptions: DataTables.Settings = {};
	showRoles:boolean = false;
	mostrar:boolean = false;

	constructor(private activedRoute:ActivatedRoute, private userService:UserService, private router:Router) { 
		this.activedRoute.params.subscribe(params=>{
			this.userId = params.id;
			this.userService.getSecurityUserById(this.userId).subscribe(responseSecurity=>{
				this.dataSecurity = responseSecurity;
				this.userService.getUserByUserName(this.dataSecurity.username).subscribe(responseUserName => {
					this.dataUsuario = responseUserName;
					this.dataUpdate(this.dataUsuario);
					this.userService.getUserLends(Number(this.dataUsuario.id)).subscribe(response => {
						this.prestamos=response;
						this.dtTrigger.next();
						this.userService.getRoles().subscribe(respuestaRoles =>{
							this.roles = respuestaRoles;
							this.mostrar = true;	
						});							
					});
				});
			});
		});

		

	}

	ngOnInit() {
		this.dtOptions = {};
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
			this.router.navigate(['administrarUsuarios']);
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

	onSubmit() { 
		let idCliente = this.userService.updateUser(this.dataUsuarioUpdate, this.dataSecurity.id); 
		this.router.navigate(['administrarUsuarios']);
	};	

	dataUpdate(data){
		this.dataUsuarioUpdate.id= data.id,
		this.dataUsuarioUpdate.username =data.username,
		this.dataUsuarioUpdate.name= data.nombre,
		this.dataUsuarioUpdate.lastname= data.apellido,
		this.dataUsuarioUpdate.nui= data.nui,
		this.dataUsuarioUpdate.email= data.email,
		this.dataUsuarioUpdate.phone= data.telefono,
		this.dataUsuarioUpdate.celphone= data.celular,
		this.dataUsuarioUpdate.address= data.direccion,
		this.dataUsuarioUpdate.profession= data.profesion,
		this.dataUsuarioUpdate.career= data.ocupacion,
		this.dataUsuarioUpdate.created= data.creado,
		this.dataUsuarioUpdate.birthday= data.fechaNacimiento,
		this.dataUsuarioUpdate.gender= data.sexo,
		this.dataUsuarioUpdate.idCity = data.idCiudad.id,
		this.dataUsuarioUpdate.idKindId= data.idTipoIdentificacion.id,
		this.dataUsuarioUpdate.modified = data.modificado,
		this.dataUsuarioUpdate.network = data.network
	}

}
