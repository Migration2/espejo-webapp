import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SancionesService } from '../../../services/sanciones.service';
import { Subject } from 'rxjs/Rx';
import { ApplySanctionModel, PenaltyModel, sancionesModel } from '../../../models/sanciones.model';
import { DataTableDirective } from 'angular-datatables';
import { UserSecurityModel, UsuarioModel } from '../../../models/usuario.model';
import { DataSource } from '@angular/cdk/table';
import { Observable } from 'rxjs';
import { PaginatePipe } from '../../../pipes/paginate.pipe';
import { PageEvent } from '@angular/material';


@Component({
    selector: 'app-sanciones',
    templateUrl: './sanciones.component.html',
    styleUrls: ['./sanciones.component.css'],
    providers: [SancionesService]
})
export class SancionesComponent implements OnInit {

    @ViewChild(DataTableDirective)
    dtElement: DataTableDirective;
    dtOptions1: any = {};
    dtOptions2: any = {};
    appliedSanctionsData: Array<sancionesModel> = [];
    activeSanctionsData: Array<sancionesModel> = [];

    sanciones1DataForView: Array<sancionesModel> = [];
    sanciones2DataForView: Array<sancionesModel> = [];

    activeSanctionDataSource: ActiveSanctionDataSource;
    appliedPenaltiesDataSource:AppliedPenaltiesDataSource;
    displayedColumns:Array<string> = [ "name","document","initSanction","endSanction"];

    dtTrigger1 = new Subject();
    dtTrigger2 = new Subject();
    mostrar = false;
    selectedSanction: sancionesModel = new sancionesModel;
    listPenalityData:Array<PenaltyModel> = [];
    userSelectedData:UsuarioModel = new UsuarioModel();
    applySanctionData:ApplySanctionModel = new ApplySanctionModel();
    userNameToValidateForm:string = "";

    //pagination
    private paginatorPipe: PaginatePipe;
    public pageSizeOptions = [5, 10, 20, 50, 100];
   
    //active sanctions paginator
    lengthData: number = 0;
    pageSize: number = 10;
    pageNumber: number = 0;

    //applied sanctions paginator
    lengthAppliedSanctions: number = 0;
    pageSizeAppliedSanctions: number = 10;
    pageNumberAppliedSanctions: number = 0;


    constructor(private router: Router, private sancionesService: SancionesService) {
        this.paginatorPipe = new PaginatePipe();
    }

    ngOnInit() {
        const bonotes = [
            {
                extend: 'copy',
                text: 'Copiar',
                messageBottom: 'Desarrollado por Dev-Codes e Inter-Telco'
            },
            {
                extend: 'print',
                text: 'Imprimir',
                messageBottom: 'Desarrollado por Dev-Codes e Inter-Telco'
            },
            {
                extend: 'csv',
                text: 'Exportar',
                messageBottom: 'Desarrollado por Dev-Codes e Inter-Telco'
            }
        ];

        this.loadAppliedSanctionsData();
        this.loadActiveSanctionsData();
        this.dtOptions1 = {
            responsive: true,
            // Declare the use of the extension in the dom parameter
            dom: 'Bfrtip',
            buttons: bonotes
        };
        this.dtOptions2 = {
            responsive: true,
            // Declare the use of the extension in the dom parameter
            dom: 'Bfrtip',
            buttons: bonotes
        };

        this.loadListPenalties();
    }

    private loadActiveSanctionsData(){
        this.sancionesService.getSancionesEstado2().subscribe(response => {
            this.activeSanctionsData = response;
            this.paginateActiveSantions(this.activeSanctionsData,this.pageNumber, this.pageNumber);
            // this.dtTrigger2.next();
        });
    }

    private loadAppliedSanctionsData(){
        this.sancionesService.getSancionesEstado1().subscribe(response => {
            this.appliedSanctionsData = response;
            this.paginateAppliedSanctions(this.appliedSanctionsData,this.pageNumberAppliedSanctions, this.pageNumberAppliedSanctions);
            // this.dtTrigger1.next();
            this.mostrar = true;
        });
    }

    finsancion(idSancion) {
        this.sancionesService.finalizarSancion(idSancion).subscribe(
            res => {
                this.loadActiveSanctionsData();
                // this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
                //     // Destroy the table first
                //     dtInstance.table(document.getElementById('sancionesActivas')).clear();
                //     dtInstance.table(document.getElementById('sancionesActivas')).destroy();  
                // });
            }
        );
    }

    loadDataUSerSelected(userSelected:UsuarioModel){
        this.userSelectedData = userSelected;
        this.userNameToValidateForm = `${this.userSelectedData.nombre} ${this.userSelectedData.apellido}`;
        this.applySanctionData.idUser = Number(this.userSelectedData.id);
        this.hideListUsersModal();
    }

    private hideListUsersModal(){
        document.getElementById("listUserModal").click();
    }

    loadListPenalties(){
        this.sancionesService.getAllManualPenalities().subscribe(penalitiesResponse => {
            this.listPenalityData = penalitiesResponse;
        }, 
        error => console.log(error));
    }

    applySanction(){
        this.applySanctionData.idPenalty = Number(this.applySanctionData.idPenalty);
        this.sancionesService.applySanction(this.applySanctionData).subscribe(response => {
            if(response.status == 202){
              this.clearFieldsApplySanctions();
              this.loadActiveSanctionsData();
            }
        }, error => console.log(error));
    }

    private clearFieldsApplySanctions(){
        this.applySanctionData.idUser = null;
        this.applySanctionData.idPenalty =null;
        this.applySanctionData.observation ="";
        this.userSelectedData = new UsuarioModel();
    }

    public sanctionDetails(sanction:sancionesModel){
        this.selectedSanction = sanction;
        console.log(sanction);
    }

    //pagination methods
    public handlePageActiveSantions(pageEvent: PageEvent) {
        this.pageSize = pageEvent.pageSize;
        this.pageNumber = pageEvent.pageIndex;
        this.paginateActiveSantions(this.activeSanctionsData, this.pageSize, this.pageNumber);
    }

    public handlePageAppliedSanctions(pageEvent: PageEvent) {
        this.pageSizeAppliedSanctions = pageEvent.pageSize;
        this.pageNumberAppliedSanctions = pageEvent.pageIndex;
        this.paginateAppliedSanctions(this.appliedSanctionsData, this.pageSizeAppliedSanctions, this.pageNumberAppliedSanctions);
    }
    
      private paginateActiveSantions(sanctionsData: Array<sancionesModel>, pageSize: number, pageNumber: number) {
          this.lengthData = sanctionsData.length;
          this.sanciones1DataForView = this.paginatorPipe.transform(sanctionsData, pageSize, pageNumber);
          this.activeSanctionDataSource = new ActiveSanctionDataSource(this.sanciones1DataForView);
      }

      private paginateAppliedSanctions(sanctionsData: Array<sancionesModel>, pageSize: number, pageNumber: number) {
          this.lengthAppliedSanctions = sanctionsData.length;
          this.sanciones2DataForView = this.paginatorPipe.transform(sanctionsData, pageSize, pageNumber);
          this.appliedPenaltiesDataSource = new AppliedPenaltiesDataSource(this.sanciones2DataForView);
      }

}

export class ActiveSanctionDataSource extends DataSource<any> {

    constructor(private alivePenalties: sancionesModel[]) {
      super();
    }
  
    connect(): Observable<sancionesModel[]> {
      return Observable.of(this.alivePenalties);
    }
  
    disconnect() { }
  }

  export class AppliedPenaltiesDataSource extends DataSource<any> {

    constructor(private stations: sancionesModel[]) {
      super();
    }
  
    connect(): Observable<sancionesModel[]> {
      return Observable.of(this.stations);
    }
  
    disconnect() { }
  }
