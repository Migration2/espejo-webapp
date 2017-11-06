export class EstacionModel {
	
	constructor(
		public id: string = "",
		public name: string = "",
		public address: string = "",
		public creado: string = "",
		public modificado: string = "",
		public latitude: string = "",
		public longitude: string = "",
		public statusName: string = "",
		public modelName : string ="",
		public availableCycles:string ="",
		public contactPointStates:Array<any>=[]
		) {}
}