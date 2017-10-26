export class BicicletaModel {
	
	constructor(
		public code: string = '',
		public created: string = "2017-10-18 20:27:55",
		public id: string = '0',
		public idBikeModel: string = '1',
		public idBikeState: string = '1',
		public idContactPoint: string = '0',
		public idKindMatto: string = '1',
		public idNetwork: string = '0',
		public modified: string = "2017-10-18 20:27:55"
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