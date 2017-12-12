export class UsuarioModel {
	
	constructor(
		public id:string = '',
		public username: string =" ",
		public nombre:string = "",
		public apellido:string = "",
		public nui:string = "",
		public email:string = "",
		public telefono:string = "",
		public celular:string = "",
		public direccion:string = "",
		public profesion:string = "",
		public ocupacion:string = "",
		public creado:string = "",
		public sexo:string ="",
		public modificado:string = "",
		public fechaNacimiento:string = "",
		public idCiudad = { 
			id: '', 
			ciudad : "",
			moDepartamento: {
				id: '',
				departamento: "",
				moPais: {
					id: '',
					codigo: "",
					pais: ""
				}
			}
		}
		) {}
}

export class UsuarioSecurityModel {
	
	constructor(
		public id:string = '',
		public username: string =" ",
		public enabled:boolean = false,
		public firstName:string = "",
		public lastName:string = "",
		public email:string = "",
		public celphone:string = "",
		public userRole:Array<any> = [],
		public created:string = "",
		public validated:boolean = false,
		public pin:string = "",
		public idCard:string= null,
		public code:string = null,
		public idLoanActive:string = null 
		) {}
}


export class UsuarioSecurityAccessModel {
	
	constructor(
		public  idUser: string = "",
		public password: string ="",
		public passwordOld: string ="",
		public pin: string ="",
		public pinOld: string =""
		) {}
}

export class usuarioDataUpdate {
	
	constructor(
		public id:string = '',
		public username: string =" ",
		public name:string = "",
		public lastname:string = "",
		public nui:string = "",
		public email:string = "",
		public phone:string = "",
		public celphone:string = "",
		public address:string = "",
		public profession:string = "",
		public career:string = "",
		public created:string = "",
		public birthday:string = "",
		public gender:string = "",
		public idCity:number = 0,
		public idKindId: number = 0,
		public modified: string ="",
		public network?:any
		) {}
}