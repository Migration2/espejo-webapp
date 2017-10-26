export class EstacionModel {
	
	constructor(
		public id: string = "",
		public nombre: string = "",
		public direccion: string = "",
		public creado: string = "",
		public modificado: string = "",
		public latitud: string = "",
		public longitud: string = "",
		public idEstadoEstacion = {
			id: "",
			estado: "",
			descipcion: "",
			creado: "",
			modificado: ""
		}
		) {}
}