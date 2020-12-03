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
		public availableCycles:number = 0,
		public contactPointStates:Array<ContactPointStateModel> = [new ContactPointStateModel()]		
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

export class ContactPointStateModel{
	constructor(
		public alias: string= '',
		public bikeCode: string= "",
		public id: string="",
		public status: string="",
		public statusTotem: string=""
	){

	}
	
}

export class ContactPointBikeModel{
	constructor(
		public codeStation: string = "",
		public idContactPoint: string = "",
		public idBike: string = ""
	)
	{}
}

export class StationKeepAliveModel{
	public constructor(
		public code:string = '',
		public lastQls:string = '',
		public lastReport:string = '',
		public latitude:number = 0,
		public longitude:number = 0,
		public stationName:string = '',
		public timeWithoutReport:number = 0		
	){}
}