import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs/Rx';
import { UserService } from '../../../services/user.service';
import { UsuarioSecurityModel, UsuarioSecurityAccessModel, UsuarioModel, usuarioDataUpdate } from '../../../models/usuario.model';
import { SancionesService } from '../../../services/sanciones.service';
import { sancionesModel } from '../../../models/sanciones.model';
import { EstacionService } from '../../../services/estacion.service';

@Component({
	selector: 'app-home-cliente',
	templateUrl: './home-cliente.component.html',
	styleUrls: ['./home-cliente.component.scss'],
	providers: [EstacionService, UserService, SancionesService]
})
export class HomeClienteComponent implements OnInit {
	title: string = 'Estaciones BiciCeja';
	Centerlat: number = 6.142979;
	Centerlng: number = -75.378276;
	dataSecurity = new UsuarioSecurityModel;
	dtTrigger = new Subject();
	dtOptions: any = {};
	dtTriggerSanciones = new Subject();
	dtOptionsSanciones: any = {};
	dtTriggerTransacciones = new Subject();
	dtOptionsTransacciones: any = {};
	securituyAccess = new UsuarioSecurityAccessModel;
	dataUsuario = new UsuarioModel;
	pin2 = "";
	password2 = "";
	mostrar: boolean = false;
	dataUsuarioUpdate = new usuarioDataUpdate;
	prestamos: Array<any> = [];
	opcionCard = "transacciones";
	sanciones: Array<sancionesModel> = [];

	constructor(private userService: UserService, private router: Router, private sancionesService: SancionesService) {

			this.userService.getInformationMe().subscribe(response => {
				this.dataSecurity = response;
				this.userService.getUserByUserName(this.dataSecurity.username).subscribe(responseUserName => {
					this.dataUsuario = responseUserName;
					let bonotes = this.getReportButtons(this.dataUsuario);
					this.dtOptions = {
						responsive: true
					};
					this.dtOptionsTransacciones = {
						responsive: true,
						// Declare the use of the extension in the dom parameter
						dom: 'Bfrtip',
						buttons: bonotes
					};
					this.dtOptionsSanciones = {
						responsive: true,
						// Declare the use of the extension in the dom parameter
						dom: 'Bfrtip',
						buttons: bonotes
					};
					this.dataUpdate(this.dataUsuario);
					this.mostrar = true;
					this.loadUSersLendsData(Number(this.dataUsuario.id));
					this.loadUserSanctionsData(this.dataUsuario.username);
				});
			});



	}
	private loadUserSanctionsData(username: string) {
		this.sancionesService.getSancionesByUserDocument(username).subscribe(response => {
			this.sanciones = response;
		});
	}

	private loadUSersLendsData(userId: number) {
		this.userService.getUserLends(userId).subscribe(response => {
			this.prestamos = response;
		});
	}

	private getReportButtons(userData) {
		return [
			{
				extend: 'copy',
				text: 'Copiar',
				messageTop: `Datos del usuario ${userData.nombre} ${userData.apellido} identificación ${userData.username}`,
				messageBottom: 'Desarrollado por Dev-Codes e Inter-Telco'
			},
			{
				extend: 'print',
				text: 'Imprimir',
				messageTop: `Datos del usuario ${userData.nombre} ${userData.apellido} identificación ${userData.username}`,
				messageBottom: 'Desarrollado por Dev-Codes e Inter-Telco'
			},
			{
				extend: 'csv',
				text: 'Exportar',
				messageTop: `Datos del usuario ${userData.nombre} ${userData.apellido} identificación ${userData.username}`,
				messageBottom: 'Desarrollado por Dev-Codes e Inter-Telco'
			}
		];
	}

	ngOnInit() { }

	cambioPass() {
		this.securituyAccess.idUser = this.dataSecurity.id;
		this.userService.changePassword(this.securituyAccess);
	}

	cambioPin() {
		this.securituyAccess.idUser = this.dataSecurity.id;
		this.userService.changePin(this.securituyAccess);
	}

	validarPin() {
		if (this.pin2 == this.securituyAccess.pin) {
			return false;
		} else {
			return true;
		}

	}

	validarPassword() {
		if (this.password2 == this.securituyAccess.password) {
			return false;
		} else {
			return true;
		}
	}

	onSubmit() {
		let idCliente = this.userService.updateUser(this.dataUsuarioUpdate, this.dataSecurity.id);
		let currentUrl = this.router.url;
		if (currentUrl != '/cliente/home') {
			this.router.navigate(['administrarUsuarios']);
		} else {
			location.reload();
		}
	};

	dataUpdate(data) {
		this.dataUsuarioUpdate.id = data.id,
			this.dataUsuarioUpdate.username = data.username,
			this.dataUsuarioUpdate.name = data.nombre,
			this.dataUsuarioUpdate.lastname = data.apellido,
			this.dataUsuarioUpdate.nui = data.nui,
			this.dataUsuarioUpdate.email = data.email.toLowerCase(),
			this.dataUsuarioUpdate.phone = data.telefono,
			this.dataUsuarioUpdate.celphone = data.celular,
			this.dataUsuarioUpdate.address = data.direccion,
			this.dataUsuarioUpdate.profession = data.profesion,
			this.dataUsuarioUpdate.career = data.ocupacion,
			this.dataUsuarioUpdate.created = data.creado,
			this.dataUsuarioUpdate.birthday = data.fechaNacimiento,
			this.dataUsuarioUpdate.gender = data.sexo,
			this.dataUsuarioUpdate.idCity = data.idCiudad.id,
			this.dataUsuarioUpdate.idKindId = data.idTipoIdentificacion.id,
			this.dataUsuarioUpdate.modified = data.modificado,
			this.dataUsuarioUpdate.network = data.network
	}

}
