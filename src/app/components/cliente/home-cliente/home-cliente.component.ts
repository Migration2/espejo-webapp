import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EstacionService } from '../../../services/estacion.service';
import { EstacionModel } from '../../../models/estacion.model';
import { Subject } from 'rxjs/Rx';
import { UserService } from '../../../services/user.service';
import { UsuarioSecurityModel, UsuarioSecurityAccessModel, UsuarioModel, usuarioDataUpdate } from '../../../models/usuario.model';

@Component({
	selector: 'app-home-cliente',
	templateUrl: './home-cliente.component.html',
	styleUrls: ['./home-cliente.component.scss'],
	providers: [EstacionService]
})
export class HomeClienteComponent implements OnInit {
	title: string = 'Estaciones BiciRío';
	Centerlat: number = 6.142979;
	Centerlng: number = -75.378276;
	dataSecurity = new UsuarioSecurityModel;
	datosEstaciones:Array<EstacionModel>=[];	
	dtTrigger = new Subject();
	dtOptions: DataTables.Settings = {};
	securituyAccess= new UsuarioSecurityAccessModel;
	dataUsuario = new UsuarioModel;
	pin2="";
	password2="";
	mostrar:boolean = false;
	dataUsuarioUpdate = new usuarioDataUpdate;

	constructor(private estacionservice : EstacionService, private userService : UserService, private router:Router) { 
		this.estacionservice.getEstaciones().subscribe(response => {
			this.datosEstaciones = response;			
			this.dtTrigger.next();
			this.userService.getInformationMe().subscribe(response => {
				this.dataSecurity = response;
				this.userService.getUserByUserName(this.dataSecurity.username).subscribe(responseUserName => {
					this.dataUsuario = responseUserName;
					this.dataUpdate(this.dataUsuario);
					this.mostrar = true;
				});					
			});	
		});

		
	}

	ngOnInit() {
		this.dtOptions = {};
	}

	cambioPass(){
		this.securituyAccess.idUser = this.dataSecurity.id;
		this.userService.changePassword(this.securituyAccess);
	}

	cambioPin(){
		this.securituyAccess.idUser = this.dataSecurity.id;
		this.userService.changePin(this.securituyAccess);
	}

	validarPin(){
		if (this.pin2 == this.securituyAccess.pin){
			return false;
		}else{
			return true;
		}
		
	}

	validarPassword(){
		if (this.password2 == this.securituyAccess.password){
			return false;
		}else{
			return true;
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
		this.dataUsuarioUpdate.email= data.email.toLowerCase(),
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
