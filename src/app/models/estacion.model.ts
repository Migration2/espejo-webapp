export class EstacionModel {
	
	constructor(
		public id: string = "",
		public code: string ="",
		public name: string = "",
		public address: string = "",
		public creado: string = "",
		public modificado: string = "",
		public latitude: string = "",
		public longitude: string = "",
		public statusName: string = "",
		public statusTotem:string ="UNLOCK_STATION",
		public modelName : string ="",
		public availableCycles:number =0,
		public contactPointStates:Array<contactPointState> =
		[
			{
			alias :"",
			bikeCode : null,
			id:"",
			status:"",
			statusTotem:""
			}
		]		
		) {}
}

export interface StationOperationTime{
	code: string;
    name: string;
    startOp: string;
    loansOp: string;
    returnOp: string;
}

export class StatisticContactPoints{
	constructor(
		public contactPoints:number = 0,
		public looseContactPoints:number = 0,
		public availableBikes:number = 0,
		public contactPointsInMto:number = 0,
		public availableBikesPercentage:number = 0,
		public looseContactPointsPercentage:number = 0,
		public contactPointsInMtoPercentage:number = 0){}
}

export interface contactPointState{
	alias :"";
	bikeCode : null;
	id:"";
	status:"";
	statusTotem:"";
}