export class BicicletaModel {
	
	constructor(
		public code: string = '',
		public id: string = '0'		
		) {}
}

export class detalleBicicletaModel {
	
	constructor(
		public id: string = '',
		public codigo: string = "",
		public creado: string = "",
		public modificado: string = "",
		public idEstadoBicicleta = {
			id: '',
			estado: "",
			descripcion: "",
			creado: "",
			modificado: ""
		}
		) {}
}