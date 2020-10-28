import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SancionesService } from '../../../services/sanciones.service';
import { Subject } from 'rxjs/Rx';
import { ApplySanctionModel, PenaltyModel, sancionesModel } from '../../../models/sanciones.model';
import { DataTableDirective } from 'angular-datatables';
import { UserSecurityModel, UsuarioModel } from '../../../models/usuario.model';
import { error } from 'protractor';

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
    sanciones1: Array<sancionesModel> = [];
    sanciones2: Array<sancionesModel> = [];
    dtTrigger1 = new Subject();
    dtTrigger2 = new Subject();
    mostrar = false;
    sancion: sancionesModel = new sancionesModel;
    sancionSeleccionada: any;
    listPenalityData:Array<PenaltyModel> = [];
    userSelectedData:UsuarioModel = new UsuarioModel();
    applySanctionData:ApplySanctionModel = new ApplySanctionModel();
    userNameToValidateForm:string = "";

    constructor(private router: Router, private sancionesService: SancionesService) {
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
        this.sancionesService.getSancionesEstado1().subscribe(response => {
            this.sanciones1 = response;
            this.dtTrigger1.next();
            this.mostrar = true;
        });
        this.sancionesService.getSancionesEstado2().subscribe(response => {
            this.sanciones2 = response;
            this.dtTrigger2.next();
        });
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

    finsancion(idSancion) {
        this.sancionesService.finalizarSancion(idSancion).subscribe(
            res => {
                this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
                    // Destroy the table first
                    dtInstance.table(document.getElementById('sancionesActivas')).clear();
                    dtInstance.table(document.getElementById('sancionesActivas')).destroy();
                    // Call the dtTrigger to rerender again
                    this.sancionesService.getSancionesEstado2().subscribe(response => {
                        this.sanciones2 = response;
                        this.dtTrigger2.next();
                    });
                });
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
            }
        }, error => console.log(error));
    }

    private clearFieldsApplySanctions(){
        this.applySanctionData.idUser = null;
        this.applySanctionData.idPenalty =null;
        this.applySanctionData.observation ="";
        this.userSelectedData = new UsuarioModel();
    }

}
