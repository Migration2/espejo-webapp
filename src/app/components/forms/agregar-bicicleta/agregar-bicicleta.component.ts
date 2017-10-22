import { Component, OnInit } from '@angular/core';
import { BicicletaModel } from '../../../models/bicileta.model';
import { BiciService } from '../../../services/bici.service';


@Component({
  selector: 'app-agregar-bicicleta',
  templateUrl: './agregar-bicicleta.component.html',
  styleUrls: ['./agregar-bicicleta.component.scss']
})
export class AgregarBicicletaComponent implements OnInit {
model = new BicicletaModel;


  constructor(private biciService:BiciService) { }

  ngOnInit() {
  }

  onSubmit() { 
    let idCliente = this.biciService.setBici(this.model);
   
   };

}
