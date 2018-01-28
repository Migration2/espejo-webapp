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