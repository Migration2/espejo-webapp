import { Component, OnInit, ViewChild } from '@angular/core';
import { PrestamoService } from '../../../services/prestamos.service';
import { StompService } from 'ng2-stomp-service';
import { DOMAIN } from '../../../../environments/domain.prod';

@Component({
  selector: 'app-operacion',
  templateUrl: './operacion.component.html',
  styleUrls: ['./operacion.component.css'],
  providers: [PrestamoService]
})
export class OperacionComponent implements OnInit {
  prestamos = [];
  prestamosFiltrados = [];
  mostrar = false;
  seleccionado: any;
  fechaActual = new Date();
  subscription: any;
  busquedaActual;

  updatePrestamo = (response) => {
    this.prestamos = response;
    this.busqueda(this.busquedaActual);
  }


  constructor(private prestamoService: PrestamoService, public stomp: StompService) { }

  ngOnInit() {
    this.prestamoService.getPrestamosActivos().subscribe(
      res => {
        this.prestamos = res;
        this.prestamosFiltrados = res;
        this.mostrar = true;
      });
    this.stomp.configure({
      host: `http://${DOMAIN}:4547/bicirio-websocket'`, // produccion
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
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnDestroy() {
    try {
      // unsubscribe
      this.subscription.unsubscribe();

      // disconnect
      this.stomp.disconnect().then(() => {
      });
    } catch (error) {

    }
  }

  tiempoLimite(prestamo) {
    const day = prestamo.slice(0, prestamo.indexOf('-'));
    const month = prestamo.slice(prestamo.indexOf('-') + 1, prestamo.lastIndexOf('-'));
    const year = prestamo.slice(prestamo.lastIndexOf('-') + 1, prestamo.indexOf(' '));
    const hour = prestamo.slice(prestamo.indexOf(' ') + 1, prestamo.indexOf(':'));
    const minutes = prestamo.slice(prestamo.indexOf(':') + 1, prestamo.lastIndexOf(':'));
    const sec = prestamo.slice(prestamo.lastIndexOf(':') + 1);
    const fechaPrestamo = new Date();
    fechaPrestamo.setFullYear(year, month - 1, day);
    fechaPrestamo.setHours(hour, minutes, sec);
    if ((this.fechaActual.getTime() - fechaPrestamo.getTime()) > (3600000)) {
      return true;
    } else {
      return false;
    }
  }

  busqueda(value) {
    if (value === undefined || value === '') {
      this.prestamosFiltrados = this.prestamos;
    } else {
      this.busquedaActual = value.toUpperCase();
      value = value.toUpperCase();
      const dataFiltrada = [];
      for (let i = 0; i < this.prestamos.length; i++) {
        // tslint:disable-next-line:max-line-length
        const nombre = this.prestamos[i]['name'].toString().toUpperCase();
        const estacion = this.prestamos[i]['loanStation'].toString().toUpperCase();
        const documento = this.prestamos[i]['username'].toString().toUpperCase();

        if (nombre.search(value) !== -1 || estacion.search(value) !== -1 || documento.search(value) !== -1) {
          dataFiltrada.push(this.prestamos[i]);
        }
      }
      this.prestamosFiltrados = dataFiltrada;
    }
  }
}
