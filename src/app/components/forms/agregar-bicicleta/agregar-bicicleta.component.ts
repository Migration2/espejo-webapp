import { Component, OnInit } from '@angular/core';
import { BicicletaModel } from '../../../models/model.bicileta';

@Component({
  selector: 'app-agregar-bicicleta',
  templateUrl: './agregar-bicicleta.component.html',
  styleUrls: ['./agregar-bicicleta.component.scss']
})
export class AgregarBicicletaComponent implements OnInit {
model = new BicicletaModel;


  constructor() { }

  ngOnInit() {
  }

}
