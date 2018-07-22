import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SancionesService } from '../../../services/sanciones.service';
import { Subject } from 'rxjs/Rx';
import { sancionesModel } from '../../../models/sanciones.model';
import { DataTableDirective } from 'angular-datatables';

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

    constructor(private router: Router, private sancionesService: SancionesService) {
    }

    ngOnInit() {
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
            responsive: true
        };
        this.dtOptions2 = {
            responsive: true
        };
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

}
