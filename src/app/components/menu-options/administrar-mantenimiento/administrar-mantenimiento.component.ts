import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-administrar-mantenimiento',
  templateUrl: './administrar-mantenimiento.component.html',
  styleUrls: ['./administrar-mantenimiento.component.scss']
})
export class AdministrarMantenimientoComponent implements OnInit {
  mostrar = true;
  opcionCard = 'estaciones';

  constructor() { }

  ngOnInit() {
  }

}
