import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs/Rx';
import { PrestamoService } from '../../../services/prestamos.service';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-operacion',
  templateUrl: './operacion.component.html',
  styleUrls: ['./operacion.component.css'],
  providers: [PrestamoService]
})
export class OperacionComponent implements OnInit {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  prestamos = [];
  mostrar: boolean = false;
  dtTrigger = new Subject();
  dtOptions: any = {};
  seleccionado: any;
  fechaActual = new Date();


  constructor(private prestamoService: PrestamoService) { }

  ngOnInit() {
    this.prestamoService.getPrestamosActivos().subscribe(
      res => {
        this.prestamos = res;
        this.dtTrigger.next();
        this.mostrar = true;
      });
    this.dtOptions = {
      responsive: true
    };
  }

  finalizarRetiro(data) {
    this.prestamoService.finalizarPrestamo(data);
    this.recargar();
  }

  private recargar() {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.table(document.getElementById('tablaPrestamos')).clear();
      dtInstance.table(document.getElementById('tablaPrestamos')).destroy();
      // Call the dtTrigger to rerender again
      this.mostrar = false;
      this.prestamoService.getPrestamosActivos().subscribe(
        res => {
          this.prestamos = res;
          this.dtTrigger.next();
          this.mostrar = true;
        });
    });
  }

  tiempoLimite(prestamo) {
    this.fechaActual.setHours(this.fechaActual.getHours() - 5);
    let fechaPrestamo = new Date(prestamo);

    if (((fechaPrestamo.getTime()) - this.fechaActual.getTime()) > 3.6e6) {
      return true;
    } else {
      return false;
    }
  }

}
