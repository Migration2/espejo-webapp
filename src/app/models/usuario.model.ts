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
		public enabled:string = "",
		public firstName:string = "",
		public lastName:string = "",
		public email:string = "",
		public celphone:string = "",
		public userRole:Array<any> = [],
		public created:string = "",
		public validated:string = "",
		public pin:string = "",
		public idCard:string= null
		) {}
}