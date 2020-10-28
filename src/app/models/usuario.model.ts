export class UsuarioModel {

	constructor(
		public id: string = '',
		public username: string = " ",
		public nombre: string = "",
		public apellido: string = "",
		public nui: string = "",
		public email: string = "",
		public telefono: string = "",
		public celular: string = "",
		public direccion: string = "",
		public profesion: string = "",
		public ocupacion: string = "",
		public creado: string = "",
		public sexo: string = "",
		public modificado: string = "",
		public fechaNacimiento: string = "",
		public idCiudad = {
			id: '',
			ciudad: "",
			moDepartamento: {
				id: '',
				departamento: "",
				moPais: {
					id: '',
					codigo: "",
					pais: ""
				}
			}
		},
		public idTipoIdentificacion = {
			tipo: ''
		}
	) { }
}

export class UsuarioSecurityModel {

	constructor(
		public id: string = '',
		public username: string = " ",
		public enabled: boolean = false,
		public firstName: string = "",
		public lastName: string = "",
		public email: string = "",
		public celphone: string = "",
		public userRole: Array<any> = [],
		public created: string = "",
		public validated: boolean = false,
		public pin: string = "",
		public idCard: string = null,
		public code: string = null,
		public idLoanActive: string = null
	) { }
}

export class UserSecurityModel{
	constructor(
		public id: string = '',
		public username: string = " ",
		public enabled: boolean = false,
		public firstName: string = "",
		public lastName: string = "",
		public email: string = "",
		public celphone: string = "",
		public userRole: Array<UserRoleModel> = [],
		public created: string = "",
		public validated: boolean = false,
		public pin: string = "",
		public idCard: string = null,
		public code: string = null,
		public idLoanActive: string = null
	) { }
}

export class UserRoleModel{
	constructor(
		public authority:string = ""
	){

	}
}


export class UsuarioSecurityAccessModel {

	constructor(
		public idUser: string = "",
		public password: string = "",
		public passwordOld: string = "",
		public pin: string = "",
		public pinOld: string = ""
	) { }
}

export class usuarioDataUpdate {

	constructor(
		public id: string = '',
		public username: string = " ",
		public name: string = "",
		public lastname: string = "",
		public nui: string = "",
		public email: string = "",
		public phone: string = "",
		public celphone: string = "",
		public address: string = "",
		public profession: string = "",
		public career: string = "",
		public created: string = "",
		public birthday: string = "",
		public gender: string = "",
		public idCity: number = 0,
		public idKindId: number = 0,
		public modified: string = "",
		public network?: any
	) { }
}

export class UserDataToUpdate {

	constructor(
		public id: string = '',
		public username: string = "",
		public firstName: string = "",
		public lastName: string = "",
		public phone: string = "",
		public cellphone: string = "",
		public address: string = "",
		public profession: string = "",
		public job:string ="",
		public gender: string = "",
		public birthday: string = "",
		public idKindUUID: number = 0,
		public idCity: number = 0,

		
		public email: string = ""
	) { }
}

export class CityModel {
	constructor(public id: string = '',
		public ciudad: string = "",
		public moDepartamento: DepartmentModel = new DepartmentModel('', "", new CountryModel())) {

	}
}

export class DepartmentModel {
	constructor(public id: string = '',
		public departamento: string = "",
		public moPais: CountryModel = new CountryModel('', "", "")) {

	}
}

export class CountryModel {
	constructor(public id: string = '',
		public codigo: string = "",
		public pais: string = "") {

	}
}

export class UserSecurityValidateInfo{
	constructor(public enabled:boolean=false,
		public validated:boolean=false,
		public code:string="",
		public idLoanActive: string = null,
		public id: number | string=0){

	}
}