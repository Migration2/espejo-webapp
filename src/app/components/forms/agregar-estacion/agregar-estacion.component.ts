import { Component, OnInit } from '@angular/core';
import { EstacionModel } from '../../../models/estacion.model';

@Component({
  selector: 'app-agregar-estacion',
  templateUrl: './agregar-estacion.component.html',
  styleUrls: ['./agregar-estacion.component.scss']
})
export class AgregarEstacionComponent implements OnInit {
model = new EstacionModel;

  constructor() { }

  ngOnInit() {
  }

}
