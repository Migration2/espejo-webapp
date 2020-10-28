export class sancionesModel {
    constructor(
        public idUser: string = '',
        public username: string = '',
        public firstName: string = '',
        public lastName: string = '',
        public observaciones: string = '',
        public fechaSancion: string = '',
        public fechaLimiteSancion: string = '',
        public id: string = "",
        public idSancion = {
            id: '',
            codigoSancion: "",
            descripcion: "",
            minutosPasadaInicial: "",
            minutosPasadaFinal: "",
            penalidadEnDias: ""
        },
        public idEstado = {
            id: '',
            estado: "",
            descripcion: ""
        }
    ) { }
}

export class PenaltyModel{
    constructor(
        public id:string=null, 
        public code:string = "",
        public description:string = "",
        public penaltyInDays:number = 0
        ){}
}

export class ApplySanctionModel{
    constructor(
        public idUser:number=null,
        public idPenalty:number=null,
        public observation:string = ""
    ){

    }

}