import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-administrar-bicicletas',
  templateUrl: './administrar-bicicletas.component.html',
  styleUrls: ['./administrar-bicicletas.component.scss']
})
export class AdministrarBicicletasComponent implements OnInit {
dtOptions: any = {};
showForm :boolean =false;

  constructor() { }

  ngOnInit() {
  }

  informacionBicicleta(){
  	console.log("hola");
  }

}
