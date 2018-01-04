export class mantenimientoEstacionModel {
	
	constructor(
		public id: string = '0',
		public desc: string = "",
		public idStationOrBike: string = "",
		public idTypeMantto: string = "",
		public idParts ?: any
		) {}
}

export class finMantenimientoEstacionModel {
	
	constructor(
		public id: string = '0',
		public desc: string = ""
		) {}
}

export class mantenimientoBikeModel {
	
	constructor(
		public id: string = '0',
		public desc: string = "",
		public idStationOrBike: string = "",
		public idTypeMantto: string = "",
		public idParts ?: any
		) {}
}

export class finMantenimientoBikeModel {
	
	constructor(
		public id: string = '0',
		public desc: string = ""
		) {}
}

export class mantenimientoHistorial {
	
	constructor(
		public observation: string = "",
		public inicio: string = "",
		public fin: string = "",
		public id: string = "",
		public detailsMantto = {
			idMoTiposPartesBicicleta:{
				name:''
			},
			idMoTiposPartesEstacion:{
				name:''	
			}
			
		}
		
		) {}
}