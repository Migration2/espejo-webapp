import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { UsuarioModel, UsuarioSecurityModel, usuarioDataUpdate, UserDataToUpdate, UserSecurityValidateInfo } from '../../../models/usuario.model';
import { Subject } from 'rxjs/Rx';
import { SancionesService } from '../../../services/sanciones.service';
import { sancionesModel } from '../../../models/sanciones.model';
import { PersonalInformationService } from '../../../services/personal-information.service';


@Component({
	selector: 'app-usuario',
	templateUrl: './usuario.component.html',
	styleUrls: ['./usuario.component.scss'],
	providers: [UserService, SancionesService, PersonalInformationService]
})
export class UsuarioComponent implements OnInit {
	dataSecurity = new UsuarioSecurityModel;
	userSecurityValidate = new UserSecurityValidateInfo();
	userDataModel = new UsuarioModel;
	userRoles:Array<string>;
	dataUsuarioUpdate = new UserDataToUpdate;
	prestamos: Array<any> = [{ 'idBikeCode': '' }];
	roles: any;
	citiesData:any;
	dtTrigger = new Subject();
	dtOptions: any = {};
	mostrar: boolean = false;
	dtTriggerSanciones = new Subject();
	dtOptionsSanciones: any = {};
	sanciones: Array<sancionesModel> = [];

	constructor(private activedRoute: ActivatedRoute, private userService: UserService, private router: Router, private sancionesService: SancionesService, private personalInformationService: PersonalInformationService) {
		this.activedRoute.params.subscribe(params => {
			this.getUserDataByUsername(params.id);
		});
	}

	getUserDataByUsername(userName:string){
		this.userService.getUserUserNameMoreDetail(userName).subscribe(userResponse => {
			//TODO: delete asign in data security
			this.userDataModel = userResponse;
			let reportButtons = this.getReportButtons(userResponse.nombre, userResponse.apellido, userResponse.username);

			this.dtOptions = {
				responsive: true,
				// Declare the use of the extension in the dom parameter
				dom: 'Bfrtip',
				buttons: reportButtons
			};
			this.dtOptionsSanciones = {
				responsive: true,
				// Declare the use of the extension in the dom parameter
				dom: 'Bfrtip',
				buttons: reportButtons
			};

			this.dataUpdate(this.userDataModel);
			this.mostrar = true;
			this.getUserSecurityValidateInfo();
			this.getUsersSanctionsByDocumentId(this.userDataModel.username);
			this.getUserLendsData(this.userDataModel.id);
			this.getRolesData();
			this.getUserRolesData(this.userDataModel.username);
			this.getCitiesData();
		});
	}

	private getReportButtons(name: string, lastName: string, documentId: string): Array<any> {
		return [
			{
				extend: 'copy',
				text: 'Copiar',
				messageTop: `Datos del usuario ${name} ${lastName} identificación ${documentId}`,
				messageBottom: 'Desarrollado por Dev-Codes e Inter-Telco'
			},
			{
				extend: 'print',
				text: 'Imprimir',
				messageTop: `Datos del usuario ${name} ${lastName} identificación ${documentId}`,
				messageBottom: 'Desarrollado por Dev-Codes e Inter-Telco'
			},
			{
				extend: 'csv',
				text: 'Exportar',
				messageTop: `Datos del usuario ${name} ${lastName} identificación ${documentId}`,
				messageBottom: 'Desarrollado por Dev-Codes e Inter-Telco'
			}
		];
	}

	private getUsersSanctionsByDocumentId(documentId: string) {
		this.sancionesService.getSancionesByUserDocument(documentId).subscribe(response => {
			this.sanciones = response;
			this.dtTriggerSanciones.next();
		});
	}

	private getUserLendsData(userId: string) {
		this.userService.getUserLends(Number(userId)).subscribe(response => {
			this.prestamos = response;
			this.dtTrigger.next();
		});
	}

	private getRolesData() {
		this.userService.getRoles().subscribe(rolesResponse => {
			this.roles = rolesResponse;
		});
	}

	private getUserRolesData(userName:string){
		this.userService.getRolesByUserName(userName).subscribe(responseUserRoles =>{
			this.userRoles = responseUserRoles;
		});
	}

	private getCitiesData(){
		this.personalInformationService.getCities().subscribe(citiesResponse => {
			this.citiesData = citiesResponse;
		});
	}

	private getUserSecurityValidateInfo(){
		this.userSecurityValidate = this.userService.getDataUserSecurity();
	}

	ngOnInit() { 

	}

	updateRoles() {
		for (let i = 0; i < this.roles.length; ++i) {
			let rol = (<HTMLInputElement>document.getElementById(this.roles[i].role));
			for (var j = 0; j < this.userRoles.length; j++) {
				if (this.roles[i].role == this.userRoles[j]) {
					if (!rol.checked) {
						this.userService.removeRol({ 'role': rol.value, 'user': this.userSecurityValidate.id });
					}
				}
			}
			if (rol.checked) {
				let a: boolean = false;
				for (var j = 0; j < this.userRoles.length; j++) {
					if (this.roles[i].role == this.userRoles[j]) {
						a = true;
					}
				}
				if (!a) {
					this.userService.addRol({ 'role': rol.value, 'user': this.userSecurityValidate.id });
				}
			}
			this.router.navigate(['administrarUsuarios']);
		}
	}

	disableUser() {
		this.userService.disableUser(this.userDataModel.username);
		this.router.navigate(['administrarUsuarios']);
	}
	enableUser() {
		this.userService.enableUser(this.userDataModel.username);
		this.router.navigate(['administrarUsuarios']);
	}

	activarRoles() {
		for (let i = 0; i < this.roles.length; ++i) {
			let rol = (<HTMLInputElement>document.getElementById(this.roles[i].role));
			for (var j = 0; j < this.userRoles.length; j++) {
				if (this.roles[i].role == this.userRoles[j]) {
					rol.checked = true;
				}
			}
		}
	}

	onSubmit() {
		this.userService.updateUserDataV2(this.dataUsuarioUpdate).subscribe(response=>{
			console.log(response);
			
			this.router.navigate(['administrarUsuarios']);
		});
		// let idCliente = this.userService.updateUser(this.dataUsuarioUpdate, this.dataSecurity.id);
		// this.router.navigate(['administrarUsuarios']);
	};

	dataUpdate(data) {
		this.dataUsuarioUpdate.id = data.id,
			this.dataUsuarioUpdate.username = data.username,
			this.dataUsuarioUpdate.firstName = data.nombre,
			this.dataUsuarioUpdate.lastName = data.apellido,
			this.dataUsuarioUpdate.phone = data.telefono,
			this.dataUsuarioUpdate.cellphone = data.celular,
			this.dataUsuarioUpdate.address = data.direccion,
			this.dataUsuarioUpdate.profession = data.profesion,
			this.dataUsuarioUpdate.job = data.ocupacion,
			this.dataUsuarioUpdate.birthday = data.fechaNacimiento,
			this.dataUsuarioUpdate.gender = data.sexo,
			this.dataUsuarioUpdate.idCity = data.idCiudad.id,
			this.dataUsuarioUpdate.idKindUUID = data.idTipoIdentificacion.id,
			this.dataUsuarioUpdate.email = data.email
	}

}
