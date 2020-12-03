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

export class AvailableBikeModel{
	constructor(
		public id: string = '',
		public status: string = "",
		public alias: string = "") 
		{}
}

export class BikeModel{
	constructor(
		public id: number = 0,
		public code: string = "",
		public created: string = "",
		public status: string = "",
		public station: string = "",
		public person: string = "",
		public missing: boolean = false
	){}
}

