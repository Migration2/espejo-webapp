import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs/Rx';
import { PrestamoService } from '../../../services/prestamos.service';
import { DataTableDirective } from 'angular-datatables';
import { StompService } from 'ng2-stomp-service';

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
  private subscription: any;


  constructor(private prestamoService: PrestamoService, public stomp: StompService) { }

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
    this.stomp.configure({
      host: 'http://bici-rio.com:4547/bicirio-websocket',//produccion
      // host: 'https://orion-bike.com:4443/bicirio-websocket',//pruebas
      // host: '/websocket/bicirio-websocket',
      debug: false,
      queue: { 'init': false, 'user': true }
    });

    this.stomp.startConnect().then(() => {
      this.stomp.done('init');
      this.subscription = this.stomp.subscribe('/topic/loans', this.updatePrestamo);
    });
  }

  finalizarRetiro(data) {
    this.prestamoService.finalizarPrestamo(data);
    this.recargar();
  }

  updatePrestamo(response) {
    console.log(response);
    // this.recargar();
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
    let day =prestamo.slice(0,prestamo.indexOf('-'));
    let month =prestamo.slice(prestamo.indexOf('-')+1,prestamo.lastIndexOf('-'));
    let year = prestamo.slice(prestamo.lastIndexOf('-')+1,prestamo.indexOf(' '));
    let hour = prestamo.slice(prestamo.indexOf(' ')+1,prestamo.indexOf(':'));
    let minutes = prestamo.slice(prestamo.indexOf(':')+1,prestamo.lastIndexOf(':'));
    let sec = prestamo.slice(prestamo.lastIndexOf(':')+1);
    let fechaPrestamo = new Date();
    fechaPrestamo.setFullYear(year,month-1,day);
    fechaPrestamo.setHours(hour, minutes, sec);
    if ((this.fechaActual.getTime() - fechaPrestamo.getTime()) > (3600000)) {
      return true;
    } else {
      return false;
    }
  }

}
