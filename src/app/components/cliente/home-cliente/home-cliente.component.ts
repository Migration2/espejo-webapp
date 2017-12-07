import { Component, OnInit } from '@angular/core';
import { EstacionService } from '../../../services/estacion.service';
import { EstacionModel } from '../../../models/estacion.model';
import { Subject } from 'rxjs/Rx';
import { UserService } from '../../../services/user.service';
import { UsuarioSecurityModel, UsuarioSecurityAccessModel, UsuarioModel } from '../../../models/usuario.model';

@Component({
	selector: 'app-home-cliente',
	templateUrl: './home-cliente.component.html',
	styleUrls: ['./home-cliente.component.scss'],
	providers: [EstacionService]
})
export class HomeClienteComponent implements OnInit {
	title: string = 'Estaciones BiciRío';
	Centerlat: number = 6.153433;
	Centerlng: number = -75.372826;
	dataSecurity = new UsuarioSecurityModel;
	datosEstaciones:Array<EstacionModel>=[];	
	dtTrigger = new Subject();
	dtOptions: DataTables.Settings = {};
	securituyAccess= new UsuarioSecurityAccessModel;
	dataUsuario = new UsuarioModel;
	// repetido:boolean=false;
	pin2="";
	password2="";

	constructor(private estacionservice : EstacionService, private userService : UserService) { 
		this.estacionservice.getEstaciones().subscribe(response => {
			this.datosEstaciones = response;			
			this.dtTrigger.next();
		});

		this.userService.getInformationMe().subscribe(response => {
			this.dataSecurity = response;
			this.userService.getUserByUserName(this.dataSecurity.username).subscribe(responseUserName => {
				this.dataUsuario = responseUserName;
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

}
