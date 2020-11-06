import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EstacionService } from '../../../services/estacion.service';
import { ContactPointBikeModel, ContactPointStateModel, EstacionModel, StationOperationTime, StatisticContactPoints } from '../../../models/estacion.model';
import { mantenimientoEstacionModel, finMantenimientoEstacionModel, mantenimientoHistorial } from '../../../models/mantenimiento.model';
import { MantenimientoService } from '../../../services/mantenimiento.service';
import { Subject } from 'rxjs/Rx';
import { DataTableDirective } from 'angular-datatables';
import { DatePipe } from '@angular/common';
import { PaginatePipe } from '../../../pipes/paginate.pipe';
import { PageEvent } from '@angular/material';
import {DataSource} from '@angular/cdk/collections'
import { Observable } from 'rxjs';
import { AvailableBikeModel } from '../../../models/bicicleta.model';

@Component({
    selector: 'app-estacion',
    templateUrl: './estacion.component.html',
    styleUrls: ['./estacion.component.scss'],
    providers: [EstacionService, MantenimientoService]
})
export class EstacionComponent implements OnInit {
    private idEstacion;
    @ViewChild(DataTableDirective)
    dtElement: DataTableDirective;
    @ViewChild('searchBikeCollapse') searchBikeCollapse;
    datosEstacion = new EstacionModel;
    mantenimientoEstacionModel = new mantenimientoEstacionModel;
    finMantenimientoEstacionModel = new finMantenimientoEstacionModel;
    mantenimientoHistorial: Array<mantenimientoHistorial>;
    puntosContacto: Array<any> = [];
    dtTrigger = new Subject();
    dtOptions: any = {};
    options: Object;
    dtTrigger2 = new Subject();
    dtOptions2: any = {};
    mostrar = false;
    partesEstacion: Array<any> = [];
    typesMantto: Array<any> = [];
    idParts: Array<any> = [];
    numeroMantenimientos = 0;
    transacciones: Array<any> = [];
    fechaActual = new Date();
    fechaAnterior = new Date();
    dtOptionsTransacciones: any = {};
    dtTriggerTransacciones = new Subject();
    opcionCard = 'puntosContacto';
    opcionCard2 = 'tendencia';

    //contact points
    public contactPointsData:Array<any> = [];
    public contactPointsDataForView:Array<any> = [];
    public contactPointsDataSouce: ContactPointsDataSource;
    public displayedColumns:Array<string> = [ "pointCol","stateCol","bikeCol", "actionCol"];
    //pagination
    private paginator: PaginatePipe;
    public pageSize: number = 10;
    public pageNumber: number = 0;
    public pageSizeOptions = [5, 10, 20, 50, 100];

    public selectedAvaBike:AvailableBikeModel = new AvailableBikeModel();
    

    stationOperationTime: StationOperationTime;
    stationStatictics:StatisticContactPoints = new StatisticContactPoints();
    datePipe:DatePipe = new DatePipe('en-US');
    lockStation:boolean = false;

    // chart

    public barChartOptions: any = {
        scaleShowVerticalLines: false,
        responsive: true
    };
    public barChartLabels: string[] = [];
    public barChartType = 'bar';
    public barChartLegend = false;
    public barChartData: any[] = [{ data: [] }];


    constructor(private activedRoute: ActivatedRoute, private estacionservice: EstacionService,
        private mantenimientoService: MantenimientoService, private router: Router) {
            this.paginator = new PaginatePipe();
            this.fechaAnterior.setDate(this.fechaActual.getDate() - 5);
            this.activedRoute.params.subscribe(params => {
            this.idEstacion = params.id;
        });
        this.loadStationTransactionsData(this.idEstacion, this.fechaAnterior, this.fechaActual);
        this.stationOperationTime = this.newInstanceStationOperationTime();

        this.estacionservice.getStationById(this.idEstacion).subscribe(response => {
            this.datosEstacion = response;
            this.stationStatictics = this.getStatisticsContactPoints(this.datosEstacion);
            this.loadStationOperationTime(this.datosEstacion.code);
            this.loadLockStation(this.datosEstacion.statusTotem);

            const bonotes = this.getReportButtons(this.datosEstacion);
            this.dtOptionsTransacciones = {
                responsive: true,
                searching: false,
                language: {
                    url: "//cdn.datatables.net/plug-ins/1.10.21/i18n/Spanish.json"
                },
                // Declare the use of the extension in the dom parameter
                dom: 'Bfrtip',
                buttons: bonotes
            };
            this.dtOptions = {
                searching: false,
                responsive: true,
                language: {
                    url: "//cdn.datatables.net/plug-ins/1.10.21/i18n/Spanish.json"
                },
                // Declare the use of the extension in the dom parameter
                dom: 'Bfrtip',
                buttons: bonotes
            };
            this.dtOptions2 = {
                columnDefs: [
                    { 'width': '50%', 'targets': 1 }
                ],
                responsive: true,
                language: {
                    url: "//cdn.datatables.net/plug-ins/1.10.21/i18n/Spanish.json"
                },
                // Declare the use of the extension in the dom parameter
                dom: 'Bfrtip',
                buttons: bonotes
            };
            this.puntosContacto = response.contactPointStates;
            this.loadContactPointData(this.puntosContacto);
            this.loadStationMaintenanceData(this.datosEstacion.id);
        });

        this.mantenimientoService.getStationParts().subscribe(respose => {
            this.partesEstacion = respose;
        });

        this.mantenimientoService.getManttoTypes().subscribe(respose => {
            this.typesMantto = respose;
        });
    }

    loadStationData(idStation:number){
        this.estacionservice.getStationById(idStation).subscribe(response => {
            this.datosEstacion = response;
            this.stationStatictics = this.getStatisticsContactPoints(this.datosEstacion);
            this.puntosContacto = response.contactPointStates;
            this.loadContactPointData(this.puntosContacto);

        });
    }

    private loadContactPointData(contactPoints:Array<any>){
        this.sortContactPointList(contactPoints);
        this.paginateContactPointsData(contactPoints, this.pageSize, this.pageNumber);
    }

    private sortContactPointList(contactPoints:Array<any>){
        contactPoints.sort((item1,item2) => {
            let it1Num:number =Number(item1.alias); 
            let it2Num:number =Number(item2.alias); 
            if(it1Num > it2Num){
                return 1;
            }
        
            if (it1Num < it2Num) {
                return -1;
            }
        
            return 0;
        });
    }

    ngOnInit() {
        
    }

     private getStatisticsContactPoints(datosEstacion:EstacionModel):StatisticContactPoints{
        let puntosContacto: Array<any> = datosEstacion.contactPointStates;
        let contactPoints:number = puntosContacto.length;
        let availableBikes:number = datosEstacion.availableCycles;
        let availableBikesPercentage:number = this.computePercentage(contactPoints, availableBikes);        
        let looseContactPoints:number = contactPoints - availableBikes;
        let looseContactPointsPercentage:number = this.computePercentage(contactPoints, looseContactPoints);        
        let contactPointsInMto:number = this.getCountBikesInMaintenance(puntosContacto);
        let contactPointsInMtoPercentage:number = this.computePercentage(contactPoints, contactPointsInMto);
        return new StatisticContactPoints(contactPoints,looseContactPoints, availableBikes, contactPointsInMto, 
            availableBikesPercentage, looseContactPointsPercentage, contactPointsInMtoPercentage);
     }

     private computePercentage(total:number, cantidadActual:number){
         return Math.round((cantidadActual * 100) / total);
     }

     private getCountBikesInMaintenance(contactPointStates:Array<any>):number{
         let numBikesMaintenance:number = 0;
        contactPointStates.forEach(function (contactPoint) {
            if("MANTENIMIENTO" == contactPoint['status']){
                numBikesMaintenance ++;
            }
        });
        return numBikesMaintenance;
     }

     private loadLockStation(statusTotem:string){
        if(statusTotem){
            if(statusTotem != "UNLOCK_STATION"){
                this.lockStation = true; 
            }
        }else{
            this.lockStation = false;
        }
     }

    private loadStationOperationTime(stationCode: string) {
        this.estacionservice.getStationOperationTimeByCode(stationCode).subscribe(operationResponse => {
            this.stationOperationTime = operationResponse;
            let hourStartOp = this.stationOperationTime.startOp.substring(11,16);
            let hourLoansOp = this.stationOperationTime.loansOp.substring(11,16);
            let hourReturnOp = this.stationOperationTime.returnOp.substring(11,16);
            
            this.stationOperationTime.startOp = hourStartOp;
            this.stationOperationTime.loansOp = hourLoansOp;
            this.stationOperationTime.returnOp = hourReturnOp;
        });
    }

    private newInstanceStationOperationTime(): StationOperationTime {
        return { code: "", name: "", startOp: "", loansOp: "", returnOp: "" };
    }

    private loadStationTransactionsData(idStation: string, initialDate: Date, endDate: Date) {
        let initialDateString: string = initialDate.toISOString().substring(0, 10);
        let endDateString: string = endDate.toISOString().substring(0, 10);
        this.estacionservice.stationTransactions(idStation, initialDateString, endDateString).subscribe(res => {
            this.transacciones = res;
            this.contarDatos(res);
            this.dtTriggerTransacciones.next();
        });
    }

    private loadStationMaintenanceData(stationId: string) {
        this.mantenimientoService.getManttosStation(stationId).subscribe(responseMan => {
            this.mantenimientoHistorial = responseMan;
            this.numeroMantenimientos = this.mantenimientoHistorial.length - 1;
            this.dtTrigger2.next();
            this.dtTrigger.next();
            this.mostrar = true;
        });
    }

    private getReportButtons(stationData: EstacionModel) {
        let reportButtons = [
            {
                extend: 'copy',
                text: 'Copiar',
                messageTop: `Datos de la Estación ${stationData.address}`,
                messageBottom: 'Desarrollado por Dev-Codes e Inter-Telco'
            },
            {
                extend: 'print',
                text: 'Imprimir',
                messageTop: `Datos de la Estación ${stationData.address}`,
                messageBottom: 'Desarrollado por Dev-Codes e Inter-Telco'
            },
            {
                extend: 'csv',
                text: 'Exportar',
                messageTop: `Datos de la Estación ${stationData.address}`,
                messageBottom: 'Desarrollado por Dev-Codes e Inter-Telco'
            }
        ];
        return reportButtons;
    }


    onSubmit() {
        this.mantenimientoEstacionModel.idParts = this.idParts;
        this.mantenimientoEstacionModel.idStationOrBike = this.datosEstacion.id;
        this.mantenimientoService.setManttoStation(this.mantenimientoEstacionModel);
        this.router.navigate(['administrarEstaciones']);
    }

    onSubmitFin() {
        this.finMantenimientoEstacionModel.id = this.mantenimientoHistorial[this.numeroMantenimientos].id;
        this.mantenimientoService.setManttoStationFin(this.finMantenimientoEstacionModel);
        this.router.navigate(['administrarEstaciones']);
    }

    updateOperationData() {
        let actualDate:string = this.datePipe.transform(new Date(), "dd-MM-yyyy");
        let newStationOperationTime = this.newInstanceStationOperationTime();
        newStationOperationTime.code = this.stationOperationTime.code;
        newStationOperationTime.name = this.stationOperationTime.name;
        newStationOperationTime.startOp = `${actualDate} ${this.stationOperationTime.startOp}:00`;
        newStationOperationTime.loansOp = `${actualDate} ${this.stationOperationTime.loansOp}:00`;
        newStationOperationTime.returnOp = `${actualDate} ${this.stationOperationTime.returnOp}:00`;
        
        this.estacionservice.updateOperationTime(newStationOperationTime).subscribe(response => {
            if(response.status == 202){
                console.log("updated operation time...");
            }
        }, 
        error => console.log(error));
    }

    eventoParteEstacion(evento) {
        if (!evento.target.checked) {
            for (let i = 0; i < this.idParts.length; i++) {
                if (evento.target.defaultValue === this.idParts[i]) {
                    this.idParts.splice(i, 1);
                }
            }
        } else {
            this.idParts.push(evento.target.defaultValue);
        }
    }



    recuperarHistorial(anterior, actual) {
        this.barChartLabels = [];
        this.barChartData = [{ data: [] }];
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            // Destroy the table first
            dtInstance.table(document.getElementById('tablaTransacciones')).clear();
            dtInstance.table(document.getElementById('tablaTransacciones')).destroy();
            // Call the dtTrigger to rerender again
            this.estacionservice.stationTransactions(this.idEstacion, anterior, actual).subscribe(res => {
                this.transacciones = res;
                this.contarDatos(res);
                this.dtTriggerTransacciones.next();

            });
        });
    }





    public updateDataTendencia(data): void {
        const clone = JSON.parse(JSON.stringify(this.barChartData));
        clone[0].data = data;
        this.barChartData = clone;
    }

    private contarDatos(transacciones) {
        const fecha: Array<object> = [];
        let bandera = false;
        for (const key in transacciones) {
            if (transacciones.hasOwnProperty(key)) {
                bandera = false;
                for (const i in fecha) {
                    if (transacciones[key].loanDate.toString().substring(0, 10) === fecha[i]['date']) {
                        bandera = true;
                        fecha[i]['count'] += 1;
                    }
                }
                if (bandera === false) {
                    const a = transacciones[key].loanDate.toString().substring(0, 10);
                    fecha.push({ 'date': a, 'count': 0 });
                }
            }
        }
        const datas: Array<object> = [];
        for (const key in fecha) {
            if (fecha.hasOwnProperty(key)) {
                this.barChartLabels.push(fecha[key]['date']);
                datas.push(fecha[key]['count']);
            }
        }
        this.updateDataTendencia(datas);
    }

    enableStation(){
        this.estacionservice.enableStation(this.datosEstacion.code).subscribe(response => {
            if(response.status == 202){
                this.datosEstacion.statusName = "SERVICIO";
                this.datosEstacion.statusTotem = "UNLOCK_STATION";
                this.lockStation = false;
            }
        },
        error => console.log("Error al acceder al recurso"));
    }

    disableStation(){
        this.estacionservice.disableStation(this.datosEstacion.code).subscribe(response => {
            if(response.status == 202){
                this.datosEstacion.statusName = "BLOQUEADA";
                this.datosEstacion.statusTotem = "LOCK_STATION";
                this.lockStation = true;
            }
        },
        error => console.log("Error al acceder al recurso"));
    }

    public handlePage(pageEvent: PageEvent) {
        this.pageSize = pageEvent.pageSize;
        this.pageNumber = pageEvent.pageIndex;
        this.paginateContactPointsData(this.puntosContacto, this.pageSize, this.pageNumber);
      }
    
      private paginateContactPointsData(stationsData: Array<any>, pageSize: number, pageNumber: number) {
        this.contactPointsDataForView = this.paginator.transform(stationsData, pageSize, pageNumber);
        this.contactPointsDataSouce = new ContactPointsDataSource(this.contactPointsDataForView);
      }

      public selectedContactPoint:ContactPointStateModel = new ContactPointStateModel();
      public selectContactPoint(contactPoint:any){
        this.selectedContactPoint = contactPoint;
      }
    
      bikeSelected(data:AvailableBikeModel){
        this.selectedAvaBike = data;
        this.searchBikeCollapse.nativeElement.className = "collapse";
      }

      cancel(){
        this.clearFiedsPutBike();
      }

      putBike(){

        let codeStation: string = this.datosEstacion.code;
		let idContactPoint: string = this.selectedContactPoint.id;
		let idBike: string = this.selectedAvaBike.alias;        
        let contactPointBike = new ContactPointBikeModel(codeStation, idContactPoint, idBike);
        console.log(contactPointBike);
        this.estacionservice.putBikeInContactPoint(contactPointBike).subscribe(
            res=>{
                this.clearFiedsPutBike;
                this.loadStationData(this.idEstacion);
           }, 
            error=> {console.log("errro")});
      }

      removeBike(){
        let codeStation: string = this.datosEstacion.code;
		let idContactPoint: string = this.selectedContactPoint.id;
		let idBike: string = this.selectedContactPoint.bikeCode;        
        let contactPointBike = new ContactPointBikeModel(codeStation, idContactPoint, idBike);
        console.log("must remove bike");
        console.log(contactPointBike);
        this.estacionservice.removeBikeOfContactPoint(contactPointBike).subscribe(
            res=>{
                this.clearFiedsPutBike;
                this.loadStationData(this.idEstacion);
           }, 
            error=> {console.log(error)});
      }

      private clearFiedsPutBike(){
          this.selectedAvaBike.id = '';
          this.selectedAvaBike.status = "";
          this.selectedAvaBike.alias = "";
          this.selectedContactPoint = new ContactPointStateModel();
      }

    HOUR_DATA: Array<string> = [
        "00:00", "00:30",
        "01:00", "01:30",
        "02:00", "02:30",
        "03:00", "03:30",
        "04:00", "04:30",
        "05:00", "05:30",
        "06:00", "06:30",
        "07:00", "07:30",
        "08:00", "08:30",
        "09:00", "09:30",
        "10:00", "10:30",
        "11:00", "11:30",
        "12:00", "12:30",
        "13:00", "13:30",
        "14:00", "14:30",
        "15:00", "15:30",
        "16:00", "16:30",
        "17:00", "17:30",
        "18:00", "18:30",
        "19:00", "19:30",
        "10:00", "10:30",
        "21:00", "21:30",
        "22:00", "22:30",
        "23:00", "23:30",
    ];

}

export class ContactPointsDataSource extends DataSource<any> {

    constructor(private sanctions: any[]) {
      super();
    }
  
    connect(): Observable<any[]> {
      return Observable.of(this.sanctions);
    }
  
    disconnect() { }
  }
